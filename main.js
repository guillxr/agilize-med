import { usernameInput, dateOfBirthInput, motherNameInput, fatherNameInput, cnsInput, cpfInput, telInput, adressInput, acsInput, cnsValue, cpfValue, telValue, newUser, checkInput, formatInputCNS, formatInputCPF, formatInputTel } from '/src/components/cardUser/cardUser.js'
import { loadUsers } from './src/pages/usersPage/usersPage.js' 

cnsInput.addEventListener('input', formatInputCNS)
cpfInput.addEventListener('input', formatInputCPF)
telInput.addEventListener('input', formatInputTel)