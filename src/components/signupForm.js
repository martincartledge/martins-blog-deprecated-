import "./index.css"
import React, { useState } from "react"
const GATSBY_API_KEY = process.env.GATSBY_API_KEY

const handleSubmit = async (values, setMessage) => {
  const data = { ...values, referrer_url: "https://martincartledge.io" }
  try {
    const response = await fetch(
      "https://api.buttondown.email/v1/subscribers",
      {
        body: JSON.stringify(data),
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${GATSBY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    if (response.ok) {
      setMessage("Subscribed successfully!")
    } else {
      setMessage("Something went wrong!")
    }
  } catch (error) {
    setMessage("Something went wrong")
  }
}

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      {message && (
        <h5 style={{ color: `#cc6b87`, fontFamily: `Montserrat, sans-serif` }}>
          {message}
        </h5>
      )}
      {!showForm && (
        <>
          <h5 className="subscribe" style={{ marginTop: `0` }}>
            <a
              style={{
                color: `#cc6b87`,
                fontFamily: `Montserrat, sans-serif`,
                boxShadow: `none`,
                textDecoration: `underline`,
                color: `#cc6b87`,
              }}
              onClick={() => setShowForm(true)}
            >
              Click here to subscribe to my newsletter.
            </a>
          </h5>
        </>
      )}
      {showForm && (
        <form
          className="email-form"
          name="newsletter"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={e => {
            e.preventDefault()
            handleSubmit({ email: email }, setMessage)
            setEmail("")
          }}
        >
          <div hidden aria-hidden="true">
            <label>
              Don’t fill this out if you're human:
              <input name="bot-field" />
            </label>
          </div>
          <label
            htmlFor="email"
            style={{ fontFamily: `Montserrat, sans-serif`, fontWeight: 900 }}
          >
            Email:
          </label>
          <div>
            <input
              type="email"
              name="email"
              className="inp"
              placeholder="shrutefarms@gmail.com   🏒"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <button
              type="submit"
              style={{
                background: `#cc6b87`,
                fontFamily: `Montserrat, sans-serif`,
                color: `#ffffff`,
                border: `0`,
                height: `2rem`,
                width: `auto`,
              }}
            >
              Subscribe
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default SignUpForm
