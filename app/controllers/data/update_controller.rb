class Data::UpdateController < CheckpointController
    def language
        response = {}
        validityCheck = validateLanguage(params[:isoID_new], params[:name], params[:population])
        if validityCheck[:valid] then
            cleaned = sanitizeLanguage(params[:isoID_new], params[:name], params[:population])
            if cleaned[:isoID] == params[:isoID_old] then
                ActiveRecord::Base.connection.exec_update(
                    "
                    UPDATE Language
                    SET name = '%s',
                        population = %d
                    WHERE ISOid = '%s';
                    " % [cleaned[:name], cleaned[:population], params[:isoID_old]]
                    )
                response[:key] = cleaned[:isoID]
                response[:message] = "Language successfully updated."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                if !existsLanguage(cleaned[:isoID]) then
                    ActiveRecord::Base.connection.exec_update(
                        "
                        UPDATE Language
                        SET ISOid = '%s',
                            name = '%s',
                            population = %d
                        WHERE ISOid = '%s';
                        " % [cleaned[:isoID], cleaned[:name], cleaned[:population], params[:isoID_old]]
                        )
                    response[:key] = cleaned[:isoID]
                    response[:message] = "Language successfully updated."
                    response[:status] = 201
                    render :json => jsonify(response), :status => 201    
                else
                    response[:errorCode] = 2
                    response[:message] = "This language already exists in the database."
                    response[:status] = 400
                    render :json => jsonify(response), :status => 400
                end
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def family
        response = {}
        validityCheck = validateFamily(params[:name_new], params[:subgroupcount], params[:info])
        if validityCheck[:valid] then
            cleaned = sanitizeFamily(params[:name_new], params[:subgroupcount], params[:info])
            if cleaned[:name] == params[:name_old] then
                ActiveRecord::Base.connection.exec_update(
                    "
                    UPDATE LanguageFamily
                    SET subgroupCount = %d,
                        info = '%s'
                    WHERE name = '%s';
                    " % [cleaned[:subgroupcount], cleaned[:info], params[:name_old]]
                    )
                response[:key] = cleaned[:name]
                response[:message] = "Language family successfully updated."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                if !existsFamily(cleaned[:name]) then
                    ActiveRecord::Base.connection.exec_update(
                        "
                        UPDATE LanguageFamily
                        SET name = '%s',
                            subgroupCount = %d,
                            info = '%s'
                        WHERE name = '%s';
                        " % [cleaned[:name], cleaned[:subgroupcount], cleaned[:info], params[:name_old]]
                        )
                    response[:key] = cleaned[:name]
                    response[:message] = "Language family successfully updated."
                    response[:status] = 201
                    render :json => jsonify(response), :status => 201
                else
                    response[:errorCode] = 2
                    response[:message] = "This language family already exists in the database."
                    response[:status] = 400
                    render :json => jsonify(response), :status => 400
                end
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def script
        response = {}
        validityCheck = validateScript(params[:isoID_new], params[:name], params[:direction], params[:hascase])
        if validityCheck[:valid] then
            cleaned = sanitizeScript(params[:isoID_new], params[:name], params[:direction], params[:hascase])
            if cleaned[:isoID] == params[:isoID_old] then
                ActiveRecord::Base.connection.exec_update(
                    "
                    UPDATE Script
                    SET name = '%s',
                        direction = '%s',
                        hasCase = %s
                    WHERE ISOid = '%s';
                    " % [cleaned[:name], cleaned[:direction], cleaned[:hascase], params[:isoID_old]]
                    )
                response[:key] = cleaned[:isoID]
                response[:message] = "Script successfully updated."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                if !existsScript(cleaned[:isoID]) then
                    ActiveRecord::Base.connection.exec_update(
                        "
                        UPDATE Script
                        SET ISOid = '%s',
                            name = '%s',
                            direction = '%s',
                            hasCase = %s
                        WHERE ISOid = '%s';
                        " % [cleaned[:isoID], cleaned[:name], cleaned[:direction], cleaned[:hascase], params[:isoID_old]]
                        )
                    response[:key] = cleaned[:isoID]
                    response[:message] = "Script successfully updated."
                    response[:status] = 201
                    render :json => jsonify(response), :status => 201
                else
                    response[:errorCode] = 2
                    response[:message] = "This script already exists in the database."
                    response[:status] = 400
                    render :json => jsonify(response), :status => 400
                end
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def country
        response = {}
        validityCheck = validateCountry(params[:isoID_new], params[:name], params[:offiname], params[:population])
        if validityCheck[:valid] then
            cleaned = sanitizeCountry(params[:isoID_new], params[:name], params[:offiname], params[:population])
            if cleaned[:isoID] == params[:isoID_old] then
                ActiveRecord::Base.connection.exec_update(
                    "
                    UPDATE Country
                    SET name = '%s',
                        offiName = '%s',
                        population = %d
                    WHERE ISOid = '%s';
                    " % [cleaned[:name], cleaned[:offiname], cleaned[:population], params[:isoID_old]]
                    )
                response[:key] = cleaned[:isoID]
                response[:message] = "Country details successfully updated."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                if !existsScript(cleaned[:isoID]) then
                    ActiveRecord::Base.connection.exec_update(
                        "
                        UPDATE Country
                        SET ISOid = '%s',
                            name = '%s',
                            offiName = '%s',
                            population = %d
                        WHERE ISOid = '%s';
                        " % [cleaned[:isoID], cleaned[:name], cleaned[:offiname], cleaned[:population], params[:isoID_old]]
                        )
                    response[:key] = cleaned[:isoID]
                    response[:message] = "Country details successfully updated."
                    response[:status] = 201
                    render :json => jsonify(response), :status => 201
                else
                    response[:errorCode] = 2
                    response[:message] = "This script already exists in the database."
                    response[:status] = 400
                    render :json => jsonify(response), :status => 400
                end
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
end
