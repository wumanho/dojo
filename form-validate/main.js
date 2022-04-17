const username = document.getElementById("username")
const password = document.getElementById("password")
const email = document.getElementById("email")
const passwordConfirm = document.getElementById("password-confirm")

// 找到表单，添加 submit 事件
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    validateForm()
})

function validateForm() {
    const userNameValue = username.value.trim()
    const passwordValue = password.value.trim()
    const emailValue = email.value.trim()
    const passwordConfirmValue = passwordConfirm.value.trim()

    if (userNameValue === "") {
        printError(username, "请输入用户名")
    } else {
        removeError(username)
    }

    if (emailValue === "") {
        printError(email, "请输入邮箱")
    } else if (!validateEmail(emailValue)) {
        printError(email, "邮箱格式不正确")
    } else {
        removeError(email)
    }

    if (passwordValue === "") {
        printError(password, "请输入密码")
    } else {
        removeError(password)
    }

    if (passwordConfirmValue === "") {
        printError(passwordConfirm, "请再次输入密码")
    } else if (passwordConfirmValue !== passwordValue) {
        printError(passwordConfirm, "两次输入的格式不正确")
    } else {
        removeError(passwordConfirm)
    }
}

function printError(input, msg) {
    const formControl = input.parentElement
    formControl.classList.add("error")
    formControl.querySelector(".error-message").textContent = msg

}

function removeError(input) {
    const formControl = input.parentElement
    formControl.classList.remove("error")
}

function validateEmail(email) {
    const regex = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    return regex.test(email)
}


