class Admin::AdminController < ApplicationController
    def hashify(password)
        BCrypt::Password.create(password).to_s
    end
    def checkhash(password, hash)
        BCrypt::Password.new(hash) == password
    end
    def signin
        # admin = Admin::Admin.find_by(username: params[:username])
        admin = ActiveRecord::Base.connection.exec_query(
            "
            SELECT username, password
            FROM Admin
            WHERE username = '%s';
            " % params[:username]
            )[0]
        response = {}
        if admin.present? && checkhash(params[:password], admin["password"])
            response[:message] = "Admin account with matching credentials exists."
            response[:status] = 200

            session.delete(:username)
            session[:username] = admin["username"]

            render :json => jsonify(response), :status => 200
        else
            response[:message] = "Invalid username or password."
            response[:status] = 404
            render :json => jsonify(response), :status => 404
        end
    end
    def signout
        if current_user
            session.delete(:username)
            redirect_to request.referrer
        else
            redirect_to request.referrer
        end
    end
end
