const errorIcon =`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f15e5e" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
    `;

const successIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5ef19b" class="bi bi-check-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
    </svg>
`

export function showModalAlert(message, icon) {
    const div = document.createElement('div');
    const divContent = document.createElement('div');
    const p = document.createElement('p');
    const button = document.createElement('button');

    div.classList.add('modal-error');
    divContent.className = 'animate__animated animate__zoomIn animate__faster modal-error-content';
    divContent.innerHTML += getIcon(icon);
    p.textContent = message;
    button.textContent = 'Fechar';
    divContent.appendChild(p);
    divContent.appendChild(button);
    div.appendChild(divContent);

    switch (icon) {
        case 'error':
            button.classList.add('errorAlert');
            break;
        case 'success':
            button.classList.add('successAlert');
            break;
        default:
            break;
    }

    document.body.appendChild(div);

    button.addEventListener('click', () => {
        divContent.className = 'animate__animated animate__zoomOut animate__faster modal-error-content';
        setTimeout(() => {
            document.body.removeChild(div);
        }, 300);
    });
}

export function getIcon(icon) {
    switch (icon) {
        case 'error':
            return errorIcon;
        case 'success':
            return successIcon;
        default:
            return '';
    }
}