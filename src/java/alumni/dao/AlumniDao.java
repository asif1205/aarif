/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package alumni.dao;

import alumni.dbutil.DBConnection;
import alumni.dto.AlumniDTO;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JOptionPane;

/**
 *
 * @author acer
 */
public class AlumniDao {

    public static int getNextId() throws SQLException {
        Connection conn = DBConnection.getConnection();
        Statement s = conn.createStatement();
        ResultSet rs = s.executeQuery("select max(rid) from allbranches");
        rs.next();
        return rs.getInt(1) + 1;
    }

    public static boolean addAlumni(AlumniDTO alumni, InputStream imageInputStream) throws SQLException {
        int rid = AlumniDao.getNextId();
        System.out.println("Funncinot is called");
        Connection conn = DBConnection.getConnection();
        PreparedStatement ps = conn.prepareStatement("insert into allbranches values(?,?,?,?,?,?,?)");
        ps.setString(1, alumni.getName());
        ps.setString(2, alumni.getC_name());
        ps.setInt(3, alumni.getBatch());
        ps.setString(4, alumni.getLinked_id());
        ps.setString(5, alumni.getBranch());
        ps.setBlob(6, imageInputStream);
        ps.setInt(7, rid);
        int temp = ps.executeUpdate();

        System.out.println("Adding alumni is running and the reuslt is " + temp + "*****************");
        if (temp > 0) {
            return true;
        }
        return false;

    }

    public static List<AlumniDTO> getallAlumnies(String branch) throws SQLException, Exception {
        ResultSet rs = null;
        
        List<AlumniDTO> list = new ArrayList<>();
        Connection conn = DBConnection.getConnection();
        if (branch.equalsIgnoreCase("all")) {
            Statement ps = conn.createStatement();
            rs = ps.executeQuery("select * from allbranches");
        } else {
            PreparedStatement ps = conn.prepareStatement("select * from allbranches where branch=?");
            ps.setString(1, branch);
            rs = ps.executeQuery();
        }

        while (rs.next()) {

            AlumniDTO al = new AlumniDTO();
            al.setName(rs.getString(1));
            al.setC_name(rs.getString(2));
            al.setBatch(rs.getInt(3));
            al.setLinked_id(rs.getString(4));
            al.setBranch(rs.getString(5));
            InputStream inputStream = rs.getBinaryStream(6);
            byte[] imageData = toByteArray(inputStream);
            al.setImageData(imageData);
            al.setRid(rs.getInt(7));
            list.add(al);

        }
        System.out.println("list is "+list);
        return list;
    }

    private static byte[] toByteArray(InputStream inputStream) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int bytesRead;
        byte[] data = new byte[4096]; // You can adjust the buffer size as needed

        while ((bytesRead = inputStream.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, bytesRead);
        }

        buffer.flush();
        return buffer.toByteArray();

    }

    public static boolean validateUser(String userid, String password) throws SQLException {
        Connection conn = DBConnection.getConnection();
        System.out.println("running 1  "+conn);
        Statement ps = conn.createStatement();
        System.out.println("runing 2");
        ResultSet rs = ps.executeQuery("select * from admin");
        System.out.println(rs+"  this is result");
        String o_userid = "";
        String o_password = "";
        while (rs.next()) {
            o_userid = rs.getString(1);
            o_password = rs.getString(2);
        }
        System.out.println(o_userid+"  "+o_password);
        if (o_userid.equalsIgnoreCase(userid) && o_password.equalsIgnoreCase(password)) {
            return true;
        }
        return false;
    }

    public static boolean updateAlumni(AlumniDTO alumni, InputStream imageInputStream) throws SQLException {

        System.out.println("Funncinot is called of update alumni");
        Connection conn = DBConnection.getConnection();
        PreparedStatement ps;
        if (imageInputStream != null) {
            ps = conn.prepareStatement("UPDATE allbranches SET name=?, c_name=?, batch=? ,linked_id=?, branch=?,img=? where rid=?");
            ps.setBlob(6, imageInputStream);
            ps.setInt(7,alumni.getRid());
        } else {
            ps = conn.prepareStatement("UPDATE allbranches SET name=?, c_name=?, batch=? ,linked_id=?, branch=? where rid=?");
           ps.setInt(6,alumni.getRid());
        }
        ps.setString(1, alumni.getName());
        ps.setString(2, alumni.getC_name());
        ps.setInt(3, alumni.getBatch());
        ps.setString(4, alumni.getLinked_id());
        ps.setString(5, alumni.getBranch());
        
        int temp = ps.executeUpdate();

        System.out.println("Adding alumni is running and the reuslt is " + temp + "*****************");
        if (temp > 0) {
            return true;
        }
        return false;

    }
    
    
    public static boolean deleteAlumni(int rid) throws SQLException {

        System.out.println("Funncinot is called of delete alumni");
        Connection conn = DBConnection.getConnection();
        PreparedStatement ps = conn.prepareStatement("delete from allbranches where rid=?");
        ps.setInt(1, rid);
        int temp = ps.executeUpdate();

        System.out.println("Adding alumni is running and the reuslt is " + temp + "*****************");
        if (temp > 0) {
            return true;
        }
        return false;

    }

}
