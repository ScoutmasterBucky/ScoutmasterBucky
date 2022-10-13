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

    swap: (data, aIndex, bIndex) => {
        const temp = data[aIndex];
        data[aIndex] = data[bIndex];
        data[bIndex] = temp;
    }
};
