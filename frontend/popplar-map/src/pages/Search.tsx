import './styles/frame.css'

export default function Search () {
  return (
    <div className={`container`}>
      <div className={`Box`} id={`top`}></div>
      <div className={`Box`} id={`left`}></div>
      <div className={`Box`} id={`right`}></div>
      <div className={`Box`} id={`bottom`}></div>
    </div>
  )
}