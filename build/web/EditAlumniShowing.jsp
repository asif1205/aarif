<%@page import="alumni.dto.AlumniDTO"%>
<%@page import="java.util.*" %>
<%@page import ="java.io.InputStream" %>

<%@page import ="java.io.ByteArrayOutputStream" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%
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
                    
        %>

        <div class="card owl-slide">
            <div class="image-content">
                <span class="overlay"></span>
                <div class="card-image">
                    <%
                        String base64Image = java.util.Base64.getEncoder().encodeToString(imageData);
                        String imageSrc = "data:image/jpeg;base64," + base64Image;
                    %>
                    <img src="<%= imageSrc%>" alt="Fetched Image" class="card-img">
                </div>
            </div>
            <div class="card-content">
                <h3 class="name"id="Name"><%=name%></h3>
                <h4 class="c_name"id="C_name"><%=c_name%></h4>
                <h6 class="branch"id="Branch">Branch:<%=branch%></h6>
                <h6 class="batch"id="Batch">Batch:<%=batch%></h6>
                <h6 class="rid"><%=rid%></h6>
                <a class="button linkedin_id" id="Linked_id"href="<%=linkedId%>">LinkedIn</a>
                <button class="button edit" onclick="editFun()">Edit</button>
                <button class="button delete" onclick="deleteFun()">Delete</button>
            </div>
        </div>
        <%
                }
            } else {
                out.print("");
            }
        %>