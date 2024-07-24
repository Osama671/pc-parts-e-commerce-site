class UserService {
  url = 'http://localhost:8080/api'
  generateRandomUsername() {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      randomString += charset.charAt(randomIndex)
    }

    return randomString
  }
  getUser() {
    var userName = localStorage.getItem('userName')
    if (!userName) {
      userName = this.generateRandomUsername()
      localStorage.setItem('userName', userName)
    }
    return userName
  }
  getAuth() {
    return 'Basic ' + btoa(`${userService.getUser()}:`)
  }

  async login(email, password) {
    try {
      console.log('LOGIN')
      const response = await fetch(`${this.url}/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      console.log(data)
      localStorage.setItem('token', data.token)
      return data
    } catch (e) {
      console.log('ERROR')
      console.error(e)
      throw new Error(e)
    }
  }

  async register(name, email, password) {
    try {
      const response = await fetch(`${this.url}/auth/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      console.log(data)
      return data
    } catch (e) {
      console.error(e)
    }
  }

  logout() {
    localStorage.removeItem('token')
  }
}

const userService = new UserService()

export default userService
