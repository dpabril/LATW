class Data::CreateController < CheckpointController
    def language
        response = {}
        validityCheck = validateLanguage(params[:isoID], params[:name], params[:population])
        if validityCheck[:valid] then
            cleaned = sanitizeLanguage(params[:isoID], params[:name], params[:population])
            if !existsLanguage(cleaned[:isoID]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO Language VALUES
                        ('%s', '%s', %d);
                    " % [cleaned[:isoID], cleaned[:name], cleaned[:population]]
                    )
                response[:key] = cleaned[:isoID]
                response[:message] = "Language successfully created."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This language already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def dialect
        response = {}
        validityCheck = validateDialect(params[:isoID], params[:name])
        if validityCheck[:valid] then
            cleaned = sanitizeDialect(params[:isoID], params[:name])
            if !existsDialect(cleaned[:isoID], cleaned[:name]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO Dialect VALUES
                        ('%s', '%s');
                    " % [cleaned[:isoID], cleaned[:name]]
                    )
                response[:message] = "Dialect successfully created."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This dialect already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
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
        validityCheck = validateFamily(params[:name], params[:subgroupcount], params[:info])
        if validityCheck[:valid] then
            cleaned = sanitizeFamily(params[:name], params[:subgroupcount], params[:info])
            if !existsFamily(cleaned[:name]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO LanguageFamily VALUES
                        ('%s', %d, '%s');
                    " % [cleaned[:name], cleaned[:subgroupcount], cleaned[:info]]
                    )
                response[:key] = cleaned[:name]
                response[:message] = "Language family successfully created."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This language family already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
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
        validityCheck = validateScript(params[:isoID], params[:name], params[:direction], params[:hascase])
        if validityCheck[:valid] then
            cleaned = sanitizeScript(params[:isoID], params[:name], params[:direction], params[:hascase])
            if !existsScript(cleaned[:isoID]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO Script VALUES
                        ('%s', '%s', '%s', %s);
                    " % [cleaned[:isoID], cleaned[:name], cleaned[:direction], cleaned[:hascase]]
                    )
                response[:key] = cleaned[:isoID]
                response[:message] = "Script successfully created."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This script already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
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
        validityCheck = validateCountry(params[:isoID], params[:name], params[:offiname], params[:population])
        if validityCheck[:valid] then
            cleaned = sanitizeCountry(params[:isoID], params[:name], params[:offiname], params[:population])
            if !existsCountry(cleaned[:isoID]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO Country VALUES
                        ('%s', '%s', '%s', %d);
                    " % [cleaned[:isoID], cleaned[:name], cleaned[:offiname], cleaned[:population]]
                    )
                response[:key] = cleaned[:isoID]
                response[:message] = "Country successfully created."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This country already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def belongsto
        response = {}
        validityCheck = validateBelongsTo(params[:langID], params[:name])
        if validityCheck[:valid] then
            if !existsBelongsTo(params[:langID], params[:name]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO languageBelongsTo VALUES
                        ('%s', '%s');
                    " % [params[:langID], params[:name]]
                    )
                response[:message] = "Language successfully bound to family."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This relationship already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def isanationallanguageof
        response = {}
        validityCheck = validateIsNational(params[:langID], params[:countryID])
        if validityCheck[:valid] then
            if !existsIsNational(params[:langID], params[:countryID]) then
                if !existsIsSpoken(params[:langID], params[:countryID]) then
                    ActiveRecord::Base.connection.exec_query(
                        "
                        INSERT INTO isSpokenIn VALUES
                            ('%s', '%s', TRUE);
                        " % [params[:langID], params[:countryID]]
                        )
                else
                    ActiveRecord::Base.connection.exec_query(
                        "
                        UPDATE isSpokenIn
                        SET isNational = TRUE
                        WHERE langID = '%s'
                          AND countryID = '%s';
                        " % [params[:langID], params[:countryID]]
                        )
                end
                response[:message] = "Language successfully bound to country."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This relationship already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def isspokenin
        response = {}
        validityCheck = validateIsSpoken(params[:langID], params[:countryID])
        if validityCheck[:valid] then
            if !existsIsSpoken(params[:langID], params[:countryID]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO isSpokenIn VALUES
                        ('%s', '%s', FALSE);
                    " % [params[:langID], params[:countryID]]
                    )
                response[:message] = "Language successfully bound to country."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This relationship already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
            end 
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
    def uses
        response = {}
        validityCheck = validateUses(params[:langID], params[:scriptID])
        if validityCheck[:valid] then
            if !existsUses(params[:langID], params[:scriptID]) then
                ActiveRecord::Base.connection.exec_query(
                    "
                    INSERT INTO languageUsesScript VALUES
                        ('%s', '%s');
                    " % [params[:langID], params[:scriptID]]
                    )
                response[:message] = "Language successfully bound to script."
                response[:status] = 201
                render :json => jsonify(response), :status => 201
            else
                response[:errorCode] = 2
                response[:message] = "This relationship already exists in the database."
                response[:status] = 400
                render :json => jsonify(response), :status => 400
            end
        else
            response[:errorCode] = 1
            response[:messages] = validityCheck[:messages]
            response[:status] = 400
            render :json => jsonify(response), :status => 400
        end
    end
end
