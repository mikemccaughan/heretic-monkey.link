export default class Utility {
    static count(array, arrow) {
        return array.filter(arrow).length;
    }
}