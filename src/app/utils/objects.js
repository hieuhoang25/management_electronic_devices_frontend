export function createDataTableAccount(
    fullname,
    email,
    phone,
    createDate,
    updateDate,
    address,
    history,
) {
    return {
        fullname,
        email,
        phone,
        createDate,
        updateDate,
        address,
        history: [
            {
                date: '2022',
                customerId: '123',
                amount: 444,
                price: 22,
            },
        ],
    };
}
