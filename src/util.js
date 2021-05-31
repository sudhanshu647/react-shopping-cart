export default function formatCurrency(price){
    return '$' + Number(price.toFixed(1)).toLocaleString() +' '
}