/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package alumni.controller;

import alumni.dao.AlumniDao;
import alumni.dto.AlumniDTO;
//import com.sun.java.swing.plaf.windows.TMSchema.Part;
//import com.sun.java.swing.plaf.windows.TMSchema.Part;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 *
 * @author acer
 */
@MultipartConfig(maxFileSize = 1024 * 1024) 
public class AddNewAlumniController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String name = request.getParameter("name");
            String c_name=request.getParameter("c_name");
            String linked_id=request.getParameter("linked_id");
            String batch=request.getParameter("batch");
            String branch = request.getParameter("branch");
            System.out.println("adding time branch is "+branch);
            branch=branch.toLowerCase();
            Part imagePart = request.getPart("image");
            System.out.println("2");
            System.out.println("imagePart is "+imagePart);
            InputStream inputStream = imagePart.getInputStream();
            System.out.println("3");
            byte[] imageData = toByteArray(inputStream);
            System.out.println("yes 1.2 is running " + imageData.length + " and name is " + name);
            InputStream imageInputStream = imagePart.getInputStream();

            AlumniDTO obj = new AlumniDTO();
            obj.setName(name);
            obj.setC_name(c_name);
            obj.setLinked_id(linked_id);
            obj.setBranch(branch);
            obj.setBatch(Integer.parseInt(batch));
            System.out.println("Data base is called for adding image");
            boolean result = AlumniDao.addAlumni(obj, imageInputStream);
            System.out.println("adding result is is adding alumni" + result);
            if (result == true) {
                out.print("yes");
            } else {
                out.print("no");
            }

        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
    
    private static byte[] toByteArray(InputStream inputStream) throws IOException {
        byte[] buffer = new byte[4096];
        int bytesRead;
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            output.write(buffer, 0, bytesRead);
        }
        return output.toByteArray();
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
