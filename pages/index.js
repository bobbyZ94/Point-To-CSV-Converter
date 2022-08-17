import MapWrapper from '../components/MapWrapper'

export default function Home() {
  return (
    <div className="grid grid-cols-3 items-center justify-center w-full h-screen">
      <div className="col-span-2 w-full h-full">
        <MapWrapper />
      </div>
      <div className="text-center">Settings</div>
    </div>
  )
}
