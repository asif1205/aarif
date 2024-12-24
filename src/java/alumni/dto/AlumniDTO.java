/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package alumni.dto;

import java.io.File;

/**
 *
 * @author acer
 */
public class AlumniDTO {

    public AlumniDTO() {
    }

    public AlumniDTO(String name, String c_name, int batch, String branch, String linked_id, byte[] imageData,int rid) {
        this.name = name;
        this.c_name = c_name;
        this.batch = batch;
        this.branch = branch;
        this.linked_id = linked_id;
        this.imageData = imageData;
        this.rid=rid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getC_name() {
        return c_name;
    }

    public void setC_name(String c_name) {
        this.c_name = c_name;
    }

    public int getBatch() {
        return batch;
    }

    public void setBatch(int batch) {
        this.batch = batch;
    }

    public String getBranch() {
        return branch;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getLinked_id() {
        return linked_id;
    }

    public void setLinked_id(String linked_id) {
        this.linked_id = linked_id;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
     public void setRid(int rid) {
        this.rid = rid;
    }
     public int getRid() {
        return rid;
    } 

    private String name;
    private String c_name;
    private int batch;
    private String branch;
    private String linked_id;
    byte[] imageData;
    int rid;
}
