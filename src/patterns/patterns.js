export const cnsPatterns = [
    [4, [/([0-9]{3})([0-9]{1,4})/, '$1 $2']],
    [8, [/([0-9]{3})([0-9]{4})([0-9]{1,4})/, '$1 $2 $3']],
    [12, [/([0-9]{3})([0-9]{4})([0-9]{4})([0-9]{1,4})/, '$1 $2 $3 $4']]
]

export const cpfPatterns = [
    [4, [/([0-9]{3})([0-9]{1,3})/, '$1.$2']],
    [7, [/([0-9]{3})([0-9]{3})([0-9]{1,3})/, '$1.$2.$3']],
    [10, [/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{1,2})/, '$1.$2.$3-$4']]
]

export const telPatterns = [
    [3, [/([0-9]{2})([0-9])/, '($1) $2']],
    [7, [/([0-9]{2})([0-9]{4})/, '($1) $2-']],
    [11, [/([0-9]{2})([0-9])([0-9]{4})([0-9]{4})/, '($1) $2 $3-$4']]
]