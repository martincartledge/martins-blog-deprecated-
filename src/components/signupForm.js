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
      setMessage("User created!")
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
  return (
    <>
      {message && <p>{message}</p>}
      <p>
        Subscribe to my blog for more programming, pictures of golden
        retrievers, and ping pong.
      </p>
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
        <label htmlFor="email">Email:</label>
        <div>
          <input
            type="email"
            name="email"
            placeholder="shrutefarms@gmail.com"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              background: `transparent`,
              color: `#cc6b87`,
            }}
          >
            Subscribe
          </button>
        </div>
      </form>
    </>
  )
}

export default SignUpForm
