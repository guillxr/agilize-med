import { usersDB } from "../../../db.js";
import { openEditModal, deleteUser } from "../../components/cardUser/cardUser.js";

const usersDiv = document.getElementById('users')

export function loadUsers() {
    for (const user of usersDB) {
        const div = document.createElement('div')
        const spanName = document.createElement('span')
        const spanMotherName = document.createElement('span')
        const spanDateOfBirth = document.createElement('span')
        const spanCNS = document.createElement('span')
        const buttonEdit = document.createElement('button')
        const buttonDelete = document.createElement('button')

        spanName.textContent = `Nome: ${user.name}`
        spanMotherName.textContent = `Nome da mãe: ${user.motherName}`
        spanDateOfBirth.textContent = `Data de Nascimento: ${user.dateOfBirth}`
        spanCNS.textContent = `CNS: ${user.cns}`
        buttonEdit.textContent = 'Editar'
        buttonEdit.classList.add('successAlert')
        buttonEdit.addEventListener('click', () => {
            openEditModal(user.cpf)
        })
        buttonDelete.textContent = 'Excluir'
        buttonDelete.classList.add('errorAlert')
        buttonDelete.addEventListener('click', () => {
            deleteUser(user.cpf)
        })
        div.appendChild(spanName)
        div.appendChild(spanMotherName)
        div.appendChild(spanDateOfBirth)
        div.appendChild(spanCNS)
        div.appendChild(buttonEdit)
        div.appendChild(buttonDelete)

        usersDiv.appendChild(div)
    }
}
loadUsers()