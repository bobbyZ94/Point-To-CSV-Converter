/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import proj4 from 'proj4'
import MapWrapper from '../components/MapWrapper'
import { trashbin, question } from '../components/SVGComponents'
import generateCsv from '../utils/generateCsv'
import InfoModal from '../components/InfoPopModal'

export default function Home() {
  // help modal state
  const [modalVisible, setModalVisible] = useState(true)

  // .csv filename state
  const [fileName, setFileName] = useState(new Date().toLocaleDateString('de-DE').replaceAll('.', '_'))

  // selector state
  const [chosenCoordinateSystem, setChosenCoordinateSystem] = useState('wsg84')

  // default coordinates are wsg84 by google maps in lat/lng epsg:4326
  // this state is passed down to MapWrapper Component
  const [markersCoordinates, setMarkersCoordinates] = useState([])

  /**
   * transform markersCoordinates Array into more readable object to get consumed by list and csv generator
   * if needed transform also into different coordinate system, depending on selector state
   *
   * about Lat/Long:
   *  Lat = Y
   *  Long = X
   *  on north facing maps, lat is represented by horizontal lines wich go up/down on on the Y axis vice versa X axis with longitude!
   */
  const [transformedMarkersCoordinates, setTransformedMarkersCoordinates] = useState([])
  useEffect(() => {
    async function transformCoordinates(chosenCoordinateSystem) {
      switch (chosenCoordinateSystem) {
        case 'gauss':
          {
            // transforming to dhdn gauss kruger zone 3 needs a nadgrid file which needs to be in an arraybuffer
            const response = await fetch('BETA2007.gsb')
            if (!response.ok) {
              throw new Error('Somethings wrong')
            }
            const buffer = await response.arrayBuffer()
            proj4.nadgrid('BETA2007.gsb', buffer)
            proj4.defs([
              [
                'EPSG:31467',
                '+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=bessel +nadgrids=@BETA2007.gsb +units=m +no_defs +type=crs',
              ],
              ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs +type=crs'],
            ])
            setTransformedMarkersCoordinates(() =>
              markersCoordinates.map((elem) => ({
                id: elem.id,
                name: elem.name,
                latLng: proj4('EPSG:4326', 'EPSG:31467', { y: elem.latLng.lat(), x: elem.latLng.lng() }),
              }))
            )
          }
          break

        default: {
          setTransformedMarkersCoordinates(() =>
            markersCoordinates.map((elem) => ({
              id: elem.id,
              name: elem.name,
              latLng: { x: elem.latLng.lat(), y: elem.latLng.lng() },
            }))
          )
        }
      }
    }
    transformCoordinates(chosenCoordinateSystem)
  }, [markersCoordinates, chosenCoordinateSystem])

  return (
    <div className="bg-slate-100 text-slate-700">
      <InfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <div className="items-center justify-center w-full h-screen xl:grid xl:grid-cols-2 2xl:grid-cols-3 ">
        <div className="w-full h-full 2xl:col-span-2">
          <MapWrapper markersCoordinates={markersCoordinates} setMarkersCoordinates={setMarkersCoordinates} />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 px-2 py-10 mx-auto text-xs rounded shadow sm:p-5 md:text-base bg-slate-300">
          <button
            onClick={() => setModalVisible(!modalVisible)}
            type="button"
            className="flex gap-2 font-bold hover:scale-105"
          >
            Hilfe {question}
          </button>
          <div className="flex flex-col items-center">
            W??hle das gew??nschte Coordinatensystem:
            <select
              className="p-1"
              name="coordinates"
              id="coordinates-select"
              value={chosenCoordinateSystem}
              onChange={(e) => setChosenCoordinateSystem(e.target.value)}
            >
              <option value="wsg84">WSG84 - Google Maps - EPSG: 4326</option>
              <option value="gauss">DHDN/3-degree Gauss-Kruger Zone 3 - EPSG:31467</option>
            </select>
          </div>

          <table className="text-center border-2 border-separate border-slate-500">
            <thead>
              <tr className="bg-slate-300">
                <th className="p-1">Punkt</th>
                <th className="p-1">Latitude/Rechtswert</th>
                <th className="p-1">Longitude/Hochwert</th>
                <th className="p-1">L??schen</th>
              </tr>
            </thead>
            <tbody>
              {transformedMarkersCoordinates.map((coordinates, index) => (
                <tr key={index}>
                  <td className="p-1 bg-slate-200">
                    <input
                      className="w-8 text-center md:w-24"
                      type="text"
                      onChange={(e) =>
                        setMarkersCoordinates(() =>
                          markersCoordinates.map((elem, index2) =>
                            index === index2 ? { ...elem, name: e.target.value } : elem
                          )
                        )
                      }
                      value={coordinates.name}
                    />
                  </td>
                  <td className="p-1 bg-slate-200">{coordinates.latLng.x}</td>
                  <td className="p-1 bg-slate-200">{coordinates.latLng.y}</td>
                  <td className="p-1 bg-slate-200">
                    <div
                      className="flex justify-center hover:scale-110 hover:cursor-pointer"
                      onClick={() =>
                        setMarkersCoordinates([
                          ...markersCoordinates.slice(0, index),
                          ...markersCoordinates.slice(index + 1, markersCoordinates.length),
                        ])
                      }
                    >
                      {trashbin}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label>
            CSV-Datei Name:
            <input className="block p-1" type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
          </label>
          <button
            type="button"
            className="px-1 text-sm border-2 rounded md:text-base border-slate-700 bg-slate-200 hover:scale-105"
          >
            <CSVLink
              enclosingCharacter=""
              data={generateCsv(transformedMarkersCoordinates, chosenCoordinateSystem)}
              filename={`${
                chosenCoordinateSystem === 'gauss'
                  ? `${fileName}_gauss_koordinaten.csv`
                  : `${fileName}_wsg84_koordinaten.csv`
              }`}
            >
              Download CSV Datei
            </CSVLink>
          </button>
        </div>
      </div>
    </div>
  )
}
