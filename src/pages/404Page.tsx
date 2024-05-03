type Props = {
  default?: boolean
}

export default function Page404(_: Props) {
  return (
    <div className='Container404'>
      <h1>404</h1>
      <h1>Page Not Found</h1>
      <a href="/">Go to home page</a>
    </div>
  )
}
