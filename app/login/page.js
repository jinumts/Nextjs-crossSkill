'use client'
 
import { authenticate } from "@/lib/action"
import { useFormState, useFormStatus } from 'react-dom'
import classes from './page.module.css'
export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
 
  return (
    <>
      <main className={classes.main}>
    <form action={dispatch} className={classes.form}>
    <div className={classes.row}>

      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      </div>
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <p className={classes.actions}>

      <LoginButton />
</p>
    </form>
    </main>
    </>
  )
}
 
function LoginButton() {
  const { pending } = useFormStatus()
 
  return (
    <button aria-disabled={pending} type="submit">
      Login
    </button>
  )
}