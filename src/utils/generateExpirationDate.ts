const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 14);
if (expirationDate.getMonth() !== new Date().getMonth()) {
    expirationDate.setDate(expirationDate.getMonth() + 1);
}

export { expirationDate }