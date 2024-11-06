import { saveData, usersDB } from '../../../db.js'
import { User } from '../../classes/user.js'
import { cnsPatterns, cpfPatterns, telPatterns } from '../../patterns/patterns.js'
import { showModalAlert } from '../modalAlert/modalAlert.js'
import { loadUsers } from '../../pages/usersPage/usersPage.js'

export const modalRegister = document.getElementById('modal-register')
export const headerForm = document.getElementById('headerForm')
export const cnsInput = document.getElementById('cnsInput')
export const cpfInput = document.getElementById('cpfInput')
export const telInput = document.getElementById('phoneInput')
export const usernameInput = document.getElementById('nameInput')
export const dateOfBirthInput = document.getElementById('dateOfBirthInput')
export const motherNameInput = document.getElementById('motherNameInput')
export const fatherNameInput = document.getElementById('fatherNameInput')
export const adressInput = document.getElementById('adressInput')
export const acsInput = document.getElementById('acs')
export const buttonsCard = document.getElementById('buttons-card')
export const createUserButton = document.getElementById('createUser')

export let cnsValue = ''
export let cpfValue = ''
export let telValue = ''

export function newUser(name, dateOfBirth, motherName, fatherName, cns, cpf, phone, adress, acs) {
    if (checkRegisteredUser(cpf, usersDB)) {
        showModalAlert("Úsuario já cadastrado.", 'error')
    } else {
        let user = new User(name, dateOfBirth, motherName, fatherName, cns, cpf, phone, adress, acs)

        usersDB.push(user)
        saveData('users', usersDB)
    }
}

function checkRegisteredUser(cpf, arr) {
    if (arr.length === 0) {
        return false
    }

    let i = 0
    while (i < arr.length) {
        if (cpf === arr[i].cpf) {
            return true
        }
        i++
    }
    return false
}

export function checkInput(inputElement, type) {
    const inputValue = inputElement.value.trim()
    let errorMessage = '';

    if (inputValue === '') {
        errorMessage = 'Este campo é obrigatório.';
    } else {
        switch (type) {
            case 'string':
                if (inputValue.length < 3) {
                    errorMessage = 'O campo deve ter pelo menos 3 caracteres.';
                }
                break;
            case 'dateOfBirth':
                const today = new Date()
                const tomorrow = new Date(today)
                
                today.setHours(0, 0, 0, 0)
                tomorrow.setDate(today.getDate() + 1)
            
                const inputDate = new Date(inputValue)
            
                if (inputDate > today) {
                    const formattedTomorrow = tomorrow.toLocaleDateString('pt-BR')
                    errorMessage = `A data de nascimento deve ser anterior à ${formattedTomorrow}.`
                }
                break;
            case 'cpf':
                if (inputValue.length !== 14) {
                    errorMessage = 'CPF deve ter 11 dígitos.';
                }
                break;
            case 'tel':
                if (inputValue.length !== 16) {
                    errorMessage = 'Telefone deve ter 11 dígitos.';
                }
                break;
            case 'cns':
                if (inputValue.length !== 18) {
                    errorMessage = 'CNS deve ter 15 dígitos.';
                }
                break;
            case 'select':
                if (inputValue.length === '') {
                    errorMessage = 'Selecione uma opção.';
                }
                break;
            default:
                break;
        }
    }

    if (errorMessage) {
        errorInput(inputElement, errorMessage);
        return false
    } else {
        clearError(inputElement);
        return true
    }
}

function errorInput(inputElement, message) {
    const formItem = inputElement.parentElement;
    const existingError = formItem.querySelector('.error-message');

    if (!existingError) {
        let errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.innerHTML = message;
        formItem.classList.add('error');
        formItem.appendChild(errorSpan);
    } else {
        existingError.innerHTML = message;
    }
}

function clearError(inputElement) {
    const formItem = inputElement.parentElement;
    const existingError = formItem.querySelector('.error-message');

    if (existingError) {
        formItem.removeChild(existingError);
        formItem.classList.remove('error');
    }
}

export function formatInput(inputElement, maxLength, patterns) {
    let inputUser = inputElement.value.replace(/\D/g, '').substring(0, maxLength)
    let formattedInput = inputUser

    for (const [length, pattern] of patterns) {
        if (inputUser.length >= length) {
            formattedInput = inputUser.replace(...pattern);
        }
    }

    inputElement.value = formattedInput
}

export const formatInputCNS = () => {
    cnsValue = cnsInput.value.replace(/\D/g, '')
    formatInput(cnsInput, 15, cnsPatterns)
}

export const formatInputCPF = () => {
    cpfValue = cpfInput.value.replace(/\D/g, '')
    formatInput(cpfInput, 11, cpfPatterns)
}

export const formatInputTel = () => {
    telValue = telInput.value.replace(/\D/g, '')
    formatInput(telInput, 11, telPatterns)
}

export function registerUser() {
    const isValidUsername = checkInput(usernameInput, 'name')
    const isValidDateOfBirth = checkInput(dateOfBirthInput, 'dateOfBirth')
    const isValidMotherName = checkInput(motherNameInput, 'string')
    const isValidCPF = checkInput(cpfInput, 'cpf')
    const isValidTel = checkInput(telInput, 'tel')
    const isValidCNS = checkInput(cnsInput, 'cns')
    const isValidAdress = checkInput(adressInput, 'string')
    const isValidACS = checkInput(acsInput, 'string')

    if (isValidUsername && isValidDateOfBirth && isValidMotherName && isValidCPF && isValidTel && isValidCNS && isValidAdress &&	isValidACS) {
        newUser(
            usernameInput.value,
            dateOfBirthInput.value,
            motherNameInput.value,
            fatherNameInput.value,
            cnsValue,
            cpfValue,
            telValue,
            adressInput.value,
            acsInput.value
        );
        closeCard()
        showModalAlert("Usuário cadastrado com sucesso.", 'success')
    }
}

export function editUser(id) {
    const isValidUsername = checkInput(usernameInput, 'name')
    const isValidDateOfBirth = checkInput(dateOfBirthInput, 'dateOfBirth')
    const isValidMotherName = checkInput(motherNameInput, 'string')
    const isValidCPF = checkInput(cpfInput, 'cpf')
    const isValidTel = checkInput(telInput, 'tel')
    const isValidCNS = checkInput(cnsInput, 'cns')
    const isValidAdress = checkInput(adressInput, 'string')
    const isValidACS = checkInput(acsInput, 'string')

    if (isValidUsername && isValidDateOfBirth && isValidMotherName && isValidCPF && isValidTel && isValidCNS && isValidAdress &&	isValidACS) {
        let user = new User(
            usernameInput.value,
            dateOfBirthInput.value,
            motherNameInput.value,
            fatherNameInput.value,
            cnsInput.value,
            usersDB[id].cpf,
            telInput.value,
            adressInput.value,
            acsInput.value
        )
    
        usersDB[id] = user
        saveData('users', usersDB)
        closeCard()
        showModalAlert("Usuário editado com sucesso.", 'success')
    }
}

export function deleteUser(cpf) {
    const userIndex = findCpf(cpf)

    if (userIndex !== false) {
        usersDB.splice(userIndex, 1)
        saveData('users', usersDB)
        showModalAlert("Usuário excluído com sucesso.", 'success')
    }
}

export function findCpf(cpf) {
    let i = 0
    while (i < usersDB.length) {
        if (cpf === usersDB[i].cpf) {
            return i
        }
        i++
    }
    return false
}

export function openEditModal(cpf) {
    clearButtons()
    modalRegister.style.display = 'flex'
    const userIndex = findCpf(cpf)

    if (userIndex !== false) {
        const user = usersDB[userIndex]
        const buttonEdit = document.createElement('button')
        const buttonClose = document.createElement('button')

        buttonClose.textContent = 'Fechar'
        buttonClose.addEventListener('click', () => {
            closeCard()
        })
        headerForm.appendChild(buttonClose)
        usernameInput.value = user.name
        dateOfBirthInput.value = user.dateOfBirth
        motherNameInput.value = user.motherName
        fatherNameInput.value = user.fatherName
        cnsInput.value = user.cns
        cpfInput.value = user.cpf
        telInput.value = user.phone
        adressInput.value = user.adress
        acsInput.value = user.acs
        buttonEdit.textContent = 'Editar'
        buttonEdit.addEventListener('click', (event) => {
            event.preventDefault()
            editUser(userIndex)
        })
        buttonsCard.appendChild(buttonEdit)
        
    } else {
        showModalAlert("Usuário não encontrado.", 'error')
    }
}

export function openRegisterModal() {
    clearButtons()
    modalRegister.style.display = 'flex'
    const buttonRegister = document.createElement('button')
    const buttonClose = document.createElement('button')

    buttonClose.textContent = 'Fechar'
    buttonClose.addEventListener('click', () => {
        closeCard()
    })
    headerForm.appendChild(buttonClose)
    buttonRegister.textContent = 'Cadastrar'
    buttonRegister.addEventListener('click', (event) => {
        event.preventDefault()
        registerUser()
    })
    buttonsCard.appendChild(buttonRegister)
}

export function clearButtons() {
    for (const b of buttonsCard.children) {
        buttonsCard.removeChild(b)
    }
}

createUserButton.addEventListener('click', () => {
    openRegisterModal()
})

function clearInputs() {
    usernameInput.value = ''
    dateOfBirthInput.value = ''
    motherNameInput.value = ''
    fatherNameInput.value = ''
    cnsInput.value = ''
    cpfInput.value = ''
    telInput.value = ''
    adressInput.value = ''
    acsInput.value = ''
}

function closeCard() {
    modalRegister.style.display = 'none'
    clearInputs()
}