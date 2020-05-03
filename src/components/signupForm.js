import React, { useState } from "react"
const GATSBY_API_KEY = process.env.GATSBY_API_KEY

const handleSubmit = async (values, setMessage) => {
  console.log("handleSubmit -> values", values)
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
      {message && <p>{message}</p>}
      {!showForm && (
        <>
          <p>
            Fan of programming, golden retrievers, or ping pong?{" "}
            <span>
              <a style={{ color: `#cc6b87` }} onClick={() => setShowForm(true)}>
                Click here to subscribe to my newsletter.
              </a>
            </span>
          </p>
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
            style={{ fontFamily: `Montserrat, sans-serif` }}
          >
            Email:
          </label>
          <div>
            <input
              type="email"
              name="email"
              placeholder="shrutefarms@gmail.com"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              style={{
                background: `#ffffff`,
                color: `#000000e6`,
                border: `0`,
                height: `2rem`,
                border: `0`,
                width: `80%`,
                maxWidth: `15rem`,
              }}
            />
            <button
              type="submit"
              style={{
                background: `#cc6b87`,
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
