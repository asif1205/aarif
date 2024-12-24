/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package alumni.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author acer
 */
public class DBConnection {
    private static Connection conn=null;
    static{
        try{
            Class.forName("oracle.jdbc.OracleDriver");
            System.out.println("class is loaded succefylly!!");
            conn=DriverManager.getConnection("jdbc:oracle:thin:@//DESKTOP-UM0HE51:1521/xe","alumni","asif");
            System.out.println("Connected sucessfully !!!!!..");
        }
        catch(ClassNotFoundException cnf)
        {
            cnf.printStackTrace();
        }
        catch(SQLException sql)
        {
            sql.printStackTrace();
        }
    }
    public static Connection getConnection(){
        return conn;
    }
    public static void closeConnection(){
        try
        {
            if(conn!=null)
                conn.close();
        }
        catch(SQLException sql)
        {
            System.out.println("Driver is not working");
            sql.printStackTrace();
            
        }
    }
}
