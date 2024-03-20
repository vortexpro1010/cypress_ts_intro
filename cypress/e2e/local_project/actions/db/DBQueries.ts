export class DBQueries {
    static SELECT_ALL_FROM_ADMINS_WHERE: string = "SELECT * FROM admins WHERE ";
    static SELECT_ALL_FROM_ADMINS: string = "SELECT * FROM admins";
    static INSERT_INTO_ADMINS_VALUES: string = "INSERT INTO admins (user_name, password, shop_id) VALUES";
}