import * as d3 from 'd3';
export const Message = data => {
    let message = "";
    message = message + "there are " + data.length + " rows.\n";
    message = message + "file size: " + Math.round(d3.csvFormat(data).length / 1024) + "kB\n";
    message = message + "there are " + data.columns.length + " columns";
    return message;
}
export default Message;