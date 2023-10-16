export class PagingRequest{
    // Số bản ghi trong 1 page
    PageSize: number = 25;

    // Số page 
    PageIndex: number = 1;

    // Chuỗi cần tìm kiếm
    SearchValue: string = "";

    // Collum cần tìm kiếm theo search value
    Collums: string[] = []

    // Điều kiện sắp xếp bản ghi
    SortOrder: string[] = []

    // Giá trị custom muốn truyền theo để xử lý logic gì đó nếu cần
    CustomParam: object = {} 

    // Lọc giá dữ liệu theo điều kiện tùy chỉnh
    // Frontend: btoa([["CreateDate","<>","Minh"],["Price",">","20000"]]')
    CustomFilter: string = ""
}