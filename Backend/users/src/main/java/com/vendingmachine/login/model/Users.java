package com.vendingmachine.login.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Users")
public class Users {

    @Id
    private int _id;
    @Field(name = "user_id")
    private int userId;
    @Setter
    @Getter
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Setter
    @Getter
    private String password;
    private boolean isadmin;

    // Getters and setters
    public int getId() {
        return _id;
    }

    public void setId(int id) {
        this._id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public boolean getRole() {
        return isadmin;
    }

    public void setRole(boolean isAdmin) {
        this.isadmin = isAdmin;
    }
}
