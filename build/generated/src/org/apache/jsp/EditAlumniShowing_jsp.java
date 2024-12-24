package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import alumni.dto.AlumniDTO;
import java.util.*;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;

public final class EditAlumniShowing_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        ");

            System.out.println("jsp is started");
            List<AlumniDTO> list = (List<AlumniDTO>) request.getAttribute("list");
            if (list.size() > 0) {
                for (int i = 0; i < list.size(); i++) {
                    AlumniDTO alumni = list.get(i);
                    String name = alumni.getName();
                    name=name.substring(0, 1).toUpperCase() + name.substring(1);
                    String c_name = alumni.getC_name();
                    c_name=c_name.substring(0, 1).toUpperCase() + c_name.substring(1);
                    String linkedId = alumni.getLinked_id();
                    int batch = alumni.getBatch();
                    String branch = alumni.getBranch();
                    byte[] imageData = alumni.getImageData();
                    int rid=alumni.getRid();
        
      out.write("\n");
      out.write("\n");
      out.write("        <div class=\"card owl-slide\">\n");
      out.write("            <div class=\"image-content\">\n");
      out.write("                <span class=\"overlay\"></span>\n");
      out.write("                <div class=\"card-image\">\n");
      out.write("                    ");

                        String base64Image = java.util.Base64.getEncoder().encodeToString(imageData);
                        String imageSrc = "data:image/jpeg;base64," + base64Image;
                    
      out.write("\n");
      out.write("                    <img src=\"");
      out.print( imageSrc);
      out.write("\" alt=\"Fetched Image\" class=\"card-img\">\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"card-content\">\n");
      out.write("                <h3 class=\"name\">");
      out.print(name);
      out.write("</h3>\n");
      out.write("                <h4 class=\"c_name\">");
      out.print(c_name);
      out.write("</h4>\n");
      out.write("                <h6 class=\"batch\">Batch:");
      out.print(batch);
      out.write("</h6>\n");
      out.write("                <h6 class=\"rid\">");
      out.print(rid);
      out.write("</h6>\n");
      out.write("                <button class=\"button edit\" onclick=\"editFun()\">Edit</button>\n");
      out.write("                <button class=\"button delete\" onclick=\"deleteFun()\">Delete</button>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        ");

                }
            } else {
                out.print("");
            }
        
      out.write("\n");
      out.write("    </body>\n");
      out.write("</html>\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
