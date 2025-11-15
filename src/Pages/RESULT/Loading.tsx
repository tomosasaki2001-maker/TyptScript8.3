


interface Props{
    active:boolean,
}
export default function Loading({active}:Props) {
  return (
    <div className={`loading ${active ? "active" : ""}`}>
        <span>～結果発表～</span>
    </div>
  )
}
