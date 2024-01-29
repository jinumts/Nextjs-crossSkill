"use client";

import { register } from "@/lib/action";
import { useFormStatus } from "react-dom";
import classes from "./page.module.css";
export default function Page() {
  return (
    <>
      <main className={classes.main}>
        <form action={register} className={classes.form}>
          <div className={classes.row}>
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="text"
              name="username"
              placeholder="username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          {/* <div>{state.message && <p>{state.message}</p>}</div> */}
          <p className={classes.actions}>
            <button type="submit">Register</button>{" "}
          </p>
        </form>
      </main>
    </>
  );
}
