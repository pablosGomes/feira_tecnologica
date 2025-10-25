// ===================================
// Contact Form Validation and Submission
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this)
      })

      input.addEventListener("input", function () {
        if (this.classList.contains("is-invalid")) {
          validateField(this)
        }
      })
    })
  }
})

function handleFormSubmit(e) {
  e.preventDefault()

  const form = e.target
  let isValid = true

  // Validate all fields
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false
    }
  })

  if (!isValid) {
    showNotification("Por favor, corrija os erros no formulário.", "danger")
    return
  }

  // Get form data
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    stage: document.getElementById("stage").value,
    message: document.getElementById("message").value.trim(),
    newsletter: document.getElementById("newsletter").checked,
  }

  // Simulate form submission
  submitForm(formData)
}

function validateField(field) {
  const value = field.value.trim()
  let isValid = true
  let errorMessage = ""

  // Check if field is required and empty
  if (field.hasAttribute("required") && !value) {
    isValid = false
    errorMessage = "Este campo é obrigatório."
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      isValid = false
      errorMessage = "Por favor, insira um e-mail válido."
    }
  }

  // Select validation
  if (field.tagName === "SELECT" && field.hasAttribute("required") && !value) {
    isValid = false
    errorMessage = "Por favor, selecione uma opção."
  }

  // Update field state
  if (isValid) {
    field.classList.remove("is-invalid")
    field.classList.add("is-valid")
  } else {
    field.classList.remove("is-valid")
    field.classList.add("is-invalid")

    const feedback = field.nextElementSibling
    if (feedback && feedback.classList.contains("invalid-feedback")) {
      feedback.textContent = errorMessage
    }
  }

  return isValid
}

function submitForm(formData) {
  // Show loading state
  const submitBtn = document.querySelector('#contactForm button[type="submit"]')
  const originalBtnText = submitBtn.innerHTML
  submitBtn.disabled = true
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...'

  // Simulate API call
  setTimeout(() => {
    // Reset button
    submitBtn.disabled = false
    submitBtn.innerHTML = originalBtnText

    // Show success message
    showSuccessMessage()

    // Reset form
    document.getElementById("contactForm").reset()

    // Remove validation classes
    const inputs = document.querySelectorAll(".is-valid, .is-invalid")
    inputs.forEach((input) => {
      input.classList.remove("is-valid", "is-invalid")
    })

    // Log form data (in production, this would be sent to a server)
    console.log("[v0] Form submitted:", formData)
  }, 1500)
}

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage")
  successMessage.style.display = "block"
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" })

  // Hide after 10 seconds
  setTimeout(() => {
    successMessage.style.display = "none"
  }, 10000)
}

function showNotification(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`
  alertDiv.style.zIndex = "9999"
  alertDiv.style.minWidth = "300px"
  alertDiv.setAttribute("role", "alert")
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `

  document.body.appendChild(alertDiv)

  // Auto dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}

// Character counter for message textarea
const messageTextarea = document.getElementById("message")
if (messageTextarea) {
  const maxLength = 1000

  // Create counter element
  const counterDiv = document.createElement("div")
  counterDiv.className = "form-text text-end"
  counterDiv.id = "messageCounter"
  messageTextarea.parentNode.appendChild(counterDiv)

  function updateCounter() {
    const length = messageTextarea.value.length
    counterDiv.textContent = `${length}/${maxLength} caracteres`

    if (length > maxLength * 0.9) {
      counterDiv.classList.add("text-warning")
    } else {
      counterDiv.classList.remove("text-warning")
    }
  }

  messageTextarea.addEventListener("input", updateCounter)
  messageTextarea.setAttribute("maxlength", maxLength)
  updateCounter()
}
