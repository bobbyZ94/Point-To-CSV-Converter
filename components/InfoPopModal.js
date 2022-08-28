/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react'
import { close } from './SVGComponents'

export default function InfoModal({ modalVisible, setModalVisible }) {
  /**
   * Removes scrollbar when PopUpMenu is visible
   */
  useEffect(() => {
    if (modalVisible) {
      document.querySelector('body').classList.add('overflow-hidden')
    } else {
      document.querySelector('body').classList.remove('overflow-hidden')
    }
  })
  return (
    <div
      onClick={() => setModalVisible(!modalVisible)}
      className={`${
        modalVisible ? '' : 'hidden z-0'
      }fixed inset-0 z-10 flex items-center justify-center bg-slate-300 bg-opacity-90 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative m-5 overflow-auto border-2 rounded md:max-h-[50rem] max-h-[30rem] bg-slate-300 border-slate-500"
      >
        <button onClick={() => setModalVisible(!modalVisible)} className="absolute right-0 p-2" type="button">
          {close}
        </button>
        <div className="max-w-2xl px-8 my-8 prose-sm prose md:px-20 md:prose-base prose-li:list-disc prose-ul:list-disc marker:text-slate-700 ">
          <h3>Wie funktioniert es?</h3>
          <ul>
            <li>
              Per <strong>Klick auf die Karte kann man Punkte generieren,</strong> welche dann in der Tabelle{' '}
              <span className="xl:hidden">unter</span> <span className="hidden xl:inline">neben</span> der Karte mit
              ihren jeweiligen Koordinaten aufgelistet werden.
            </li>
            <li>
              Man kann die <strong>Punkte per Klicken & Ziehen verschieben, sowie per Doppelklick löschen.</strong>{' '}
              Alternativ kann man die Punkte auch in der Tabelle per Klick auf Mülleimer löschen.
            </li>
            <li>
              Mit dem Selektor kann man das gewünschte <strong>Koordinatensystem auswählen,</strong> in dem die Punkte
              ausgegeben werden sollen.
            </li>
            <li>
              Die Namen der Punkte können geändert werden per Klick auf das "Punkt" Feld in der Tabelle.{' '}
              <strong>Vorsicht: Kein Komma benutzen !</strong>
            </li>
            <li>
              Sind alle gewünschten Punkte markiert, kann man den Namen der CSV-Datei auf Wunsch ändern und per Klick
              auf "Download CSV Datei" eine mit der Reach View 3 App kompitable .csv Datei herunterladen.{' '}
              <strong>
                Achtung: Reach View 3 verlangt immer eine Elevation (Höhenangabe) in der CSV-Datei, diese wird
                einfachheitshalber immer auf 0 gesetzt!
              </strong>
            </li>
            <li>
              In der Reach View 3 App einfach ein neues Projekt starten und das gleiche Koordinatensystem wie in der
              CSV-Datei wählen und dann die CSV-Datei importieren.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
