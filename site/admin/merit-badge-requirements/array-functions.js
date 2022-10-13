module.exports = {
    insertAfter: (data, index, element) => {
        if (index === null) {
            data.unshift(element);
        } else {
            data.splice(index + 1, 0, element);
        }
    },

    remove: (data, index) => {
        data.splice(index, 1);
    },

    removeValue: (data, value) => {
        for (let i = data.length - 1; i >= 0; i -= 1) {
            if (data[i] === value) {
                data.splice(i, 1);
            }
        }
    },

    swap: (data, aIndex, bIndex) => {
        const temp = data[aIndex];
        data[aIndex] = data[bIndex];
        data[bIndex] = temp;
    }
};
