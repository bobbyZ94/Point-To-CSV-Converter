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
              Per Klick auf die Karte kann man Punkte generieren, welche dann in der Tabelle{' '}
              <span className="xl:hidden">unter</span> <span className="hidden xl:inline">neben</span> der Karte mit
              ihren jeweiligen Koordinaten aufgelistet werden.
            </li>
            <li>
              Man kann die Punkte per Klicken & Ziehen verschieben, sowie per Doppelklick löschen. Alternativ kann man
              die Punkte auch in der Tabelle per Klick auf Mülleimer löschen.
            </li>
            <li>
              Mit dem Selektor kann man das gewünschte Koordinatensystem auswählen, in dem die Punkte ausgegeben werden
              sollen.
            </li>
            <li>
              Sind alle gewünschten Punkte markiert, kann man per Klick auf "Download CSV Datei" eine mit der Reach View
              3 App kompitable .csv Datei herunterladen.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
