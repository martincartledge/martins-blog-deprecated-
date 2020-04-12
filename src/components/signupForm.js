import React from "react"

const processForm = form => {
  const data = new FormData(form)
  data.append("form-name", "newsletter")
  fetch("/", {
    method: "POST",
    body: data,
  })
    .then(() => {
      form.innerHTML = `<div class="form--success">Almost there! Check your inbox for a confirmation e-mail.</div>`
    })
    .catch(error => {
      form.innerHTML = `<div class="form--error">Error: ${error}</div>`
    })
}

const SignUpForm = () => {
  const emailForm = document.querySelector(".email-form")
  if (emailForm) {
    emailForm.addEventListener("submit", e => {
      e.preventDefault()
      processForm(emailForm)
    })
  }
  return (
    <>
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
        onSubmit={processForm}
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
