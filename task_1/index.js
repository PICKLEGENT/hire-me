import { encoded, translations } from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

const translationsKeys = Object.keys(translations)  // Записываем существующие ключи из объекта translations

let uniq = []   // Уникальные id

const decodeObj = (obj) => {
    const keys = Object.keys(obj)   // Записываем существующие ключи из получаемого объекта

    // Итерируемся по массиву ключей
    for (let i = 0; i < keys.length; i++) {
        if (!translationsKeys.includes(obj[keys[i]])) {
            uniq.push(obj[keys[i]])
        }

        // Если тип элемент объекта равен строке, то проверяем на исключения
        if (typeof obj[keys[i]] === 'string') {

            // Проверяем на исключения
            if (keys[i] !== 'formatSize' || keys[i] !== 'ca' || keys[i] !== 'service' || keys[i] !== 'groupId') {
                obj[keys[i]] = translations[obj[keys[i]]]
            }
        }
    }
}

const decoded = (data) => {

    // Итерируемся по массиву объектов
    for (let i = 0; i < data.length; i++) {
        decodeObj(data[i])
    }

    // Возвращаем измененный объект 
    return data
}

console.log(decoded(encoded))

// Уникальные id
console.log(new Set(uniq))