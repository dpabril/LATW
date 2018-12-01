class CheckpointController < ApplicationController
    # ===================================================
    #         Existence Checks for Data Integrity
    # ===================================================
    def existsLanguage(isoID)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid
            FROM Language
            WHERE ISOid = '%s';
            " % isoID
            )
        if query.present? then
            return true
        else
            return false
        end
    end
    def existsDialect(isoID, dname)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Dialect
            WHERE ISOid = '%s'
              AND name = '%s';
            " % [isoID, dname]
            )
        if existsLanguage(isoID) and query.present? then
            return true
        else
            return false
        end
    end
    def existsFamily(lfamID)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT name
            FROM LanguageFamily
            WHERE name = '%s';
            " % lfamID
            )
        if query.present? then
            return true
        else
            return false
        end
    end
    def existsScript(isoID)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid
            FROM Script
            WHERE ISOid = '%s';
            " % isoID
            )
        if query.present? then
            return true
        else
            return false
        end
    end
    def existsCountry(isoID)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid
            FROM Country
            WHERE ISOid = '%s';
            " % isoID
            )
        if query.present? then
            return true
        else
            return false
        end
    end
    def existsBelongsTo(langID, lfname)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT langID
            FROM languageBelongsTo
            WHERE langID = '%s';
            " % langID
            )
        if (existsLanguage(langID) and existsFamily(lfname)) and query.present? then
            return true
        else
            return false
        end
    end
    def existsIsNational(langID, countryID)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT langID, countryID
            FROM isSpokenIn
            WHERE langID = '%s'
              AND countryID = '%s'
              AND isNational = TRUE;
            " % [langID, countryID]
            )
        if (existsLanguage(langID) and existsCountry(countryID)) and query.present? then
            return true
        else
            return false
        end
    end
    def existsIsSpoken(langID, countryID)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT langID, countryID
            FROM isSpokenIn
            WHERE langID = '%s'
              AND countryID = '%s';
            " % [langID, countryID]
            )
        if (existsLanguage(langID) and existsCountry(countryID)) and query.present? then
            return true
        else
            return false
        end
    end
    def existsUses(langID, scriptID)
        query = ActiveRecord::Base.connection.exec_query(
            "
            SELECT langID, scriptID
            FROM languageUsesScript
            WHERE langID = '%s'
              AND scriptID = '%s';
            " % [langID, scriptID]
            )
        if (existsLanguage(langID) and existsScript(scriptID)) and query.present? then
            return true
        else
            return false
        end
    end

    # ===================================================
    #                Input Validatity Checks
    # ===================================================

    #  Atomic validity checks for reuse
    def validLanguageISOid?(isoID)
        return /\A[a-z]{3}\z/.match? (isoID)
    end
    def validScriptISOid?(isoID)
        return /\A[A-Z][a-z]{3}\z/.match? (isoID)
    end
    def validCountryISOid?(isoID)
        return /\A[A-Z]{2}\z/.match? (isoID)
    end
    def validText?(text)
        return (text.strip).length > 0
    end
    def validPopulation?(number)
        return /\A[1-9][0-9]{0,9}\z/.match? ((number.to_i).to_s)
    end
    def validSubgroupCount?(number)
        return /\A[0-9]+\z/.match? ((number.to_i).to_s)
    end

    def validateLanguage(isoID, lname, population)
        validityCheck = { :valid => true, :messages => {} }
        if validLanguageISOid? (isoID) then
            validityCheck[:messages][:isoID] = ""
        else
            validityCheck[:messages][:isoID] = "The correct format is three lowercase letters (e.g. fil)."
            validityCheck[:valid] = false
        end
        if validText? (lname) then
            validityCheck[:messages][:name] = ""
        else
            validityCheck[:messages][:name] = "Please give the language a name."
            validityCheck[:valid] = false
        end
        if validPopulation? (population) then
            validityCheck[:messages][:population] = ""
        else
            validityCheck[:messages][:population] = "Please enter a positive integer."
            validityCheck[:valid] = false
        end
        return validityCheck
    end
    def validateDialect(isoID, dname)
        validityCheck = { :valid => true, :messages => {} }
        if validLanguageISOid? (isoID) then
            validityCheck[:messages][:isoID] = ""
        else
            validityCheck[:messages][:isoID] = "This is not a valid choice."
            validityCheck[:valid] = false
        end
        if validText? (dname) then
            validityCheck[:messages][:name] = ""
        else
            validityCheck[:messages][:name] = "Please give the dialect a name."
            validityCheck[:valid] = false
        end
        return validityCheck
    end
    def validateFamily(lfname, subgroupcount, info)
        validityCheck = { :valid => true, :messages => {} }
        if validText? (lfname) then
            validityCheck[:messages][:name] = ""
        else
            validityCheck[:messages][:name] = "Please give the language a family a name."
            validityCheck[:valid] = false
        end
        if validSubgroupCount? (subgroupcount) then
            validityCheck[:messages][:subgroupcount] = ""
        else
            validityCheck[:messages][:subgroupcount] = "Please enter a non-negative integer."
            validityCheck[:valid] = false
        end
        validityCheck[:messages][:info] = ""
        return validityCheck
    end
    def validateScript(isoID, sname, direction, hascase)
        validityCheck = { :valid => true, :messages => {} }
        if validScriptISOid? (isoID) then
            validityCheck[:messages][:isoID] = ""
        else
            validityCheck[:messages][:isoID] = "The correct format is a capitalized four-letter word (e.g. Latn)."
            validityCheck[:valid] = false
        end
        if validText? (sname) then
            validityCheck[:messages][:name] = ""
        else
            validityCheck[:messages][:name] = "Please give the script a name."
            validityCheck[:valid] = false
        end
        if ["left-to-right", "right-to-left", "vertical", "No information", nil].include? (direction) then
            validityCheck[:messages][:direction] = ""
        else
            validityCheck[:messages][:direction] = "Please choose a valid direction."
            validityCheck[:valid] = false
        end
        if ["true", "false"].include? (hascase) then
            validityCheck[:messages][:hascase] = ""
        else
            validityCheck[:messages][:hascase] = "Please choose between \"Yes\" and \"No\"."
            validityCheck[:valid] = false
        end
        return validityCheck
    end
    def validateCountry(isoID, cname, offiname, population)
        validityCheck = { :valid => true, :messages => {} }
        if validCountryISOid? (isoID) then
            validityCheck[:messages][:isoID] = ""
        else
            validityCheck[:messages][:isoID] = "The correct format is two uppercase letters (e.g. PH)."
            validityCheck[:valid] = false
        end
        if validText? (cname) then
            validityCheck[:messages][:name] = ""
        else
            validityCheck[:messages][:name] = "Please enter the country's name."
            validityCheck[:valid] = false
        end
        if validText? (offiname) then
            validityCheck[:messages][:offiname] = ""
        else
            validityCheck[:messages][:offiname] = "Please enter the country's official name."
            validityCheck[:valid] = false
        end
        if validPopulation? (population) then
            validityCheck[:messages][:population] = ""
        else
            validityCheck[:messages][:population] = "Please choose a positive integer."
            validityCheck[:valid] = false
        end
        return validityCheck
    end
    def validateBelongsTo(langID, lfamID)
        validityCheck = { :valid => true, :messages => {} }
        if validLanguageISOid? (langID) then
            validityCheck[:messages][:langID] = ""
        else
            validityCheck[:messages][:langID] = "Please choose a valid language."
            validityCheck[:valid] = false
        end
        if validText? (lfamID) then
            validityCheck[:messages][:lfamID] = ""
        else
            validityCheck[:messages][:lfamID] = "Please enter a valid language family."
            validityCheck[:valid] = false
        end
        return validityCheck
    end
    def validateIsNational(langID, countryID)
        # puts "ENTERED validateIsNational"
        validityCheck = { :valid => true, :messages => {} }
        if validLanguageISOid? (langID) then
            validityCheck[:messages][:langID] = ""
            # puts "langID VALID"
        else
            validityCheck[:messages][:langID] = "Please choose a valid language."
            validityCheck[:valid] = false
        end
        if validCountryISOid? (countryID) then
            validityCheck[:messages][:countryID] = ""
            # puts "countryID VALID"
        else
            validityCheck[:messages][:countryID] = "Please choose a valid country."
            validityCheck[:valid] = false
        end
        return validityCheck
    end
    def validateIsSpoken(langID, countryID)
        validityCheck = { :valid => true, :messages => {} }
        if validLanguageISOid? (langID) then
            validityCheck[:messages][:langID] = ""
        else
            validityCheck[:messages][:langID] = "Please choose a valid language."
            validityCheck[:valid] = false
        end
        if validCountryISOid? (countryID) then
            validityCheck[:messages][:countryID] = ""
        else
            validityCheck[:messages][:countryID] = "Please choose a valid country."
            validityCheck[:valid] = false
        end
        return validityCheck
    end
    def validateUses(langID, scriptID)
        validityCheck = { :valid => true, :messages => {} }
        if validLanguageISOid? (langID) then
            validityCheck[:messages][:langID] = ""
        else
            validityCheck[:messages][:langID] = "Please choose a valid language."
            validityCheck[:valid] = false
        end
        if validScriptISOid? (scriptID) then
            validityCheck[:messages][:scriptID] = ""
        else
            validityCheck[:messages][:scriptID] = "Please choose a valid script."
            validityCheck[:valid] = false
        end
        return validityCheck
    end

    # ===================================================
    #                  Input Sanitation
    # ===================================================
    def stripsub(text)
        return (text.strip).gsub("'","''").gsub("’", "''")
    end
    def sanitizeLanguage(isoID, lname, population)
        cleaned = {}
        cleaned[:isoID] = isoID
        cleaned[:name] = stripsub(lname)
        cleaned[:population] = population.to_i
        return cleaned
    end
    def sanitizeDialect(isoID, dname)
        cleaned = {}
        cleaned[:isoID] = isoID
        cleaned[:name] = stripsub(dname)
        return cleaned
    end
    def sanitizeFamily(lfname, subgroupcount, info)
        cleaned = {}
        cleaned[:name] = stripsub(lfname)
        cleaned[:subgroupcount] = subgroupcount.to_i
        cleaned[:info] = stripsub(info)
        return cleaned
    end
    def sanitizeScript(isoID, sname, direction, hascase)
        cleaned = {}
        cleaned[:isoID] = isoID
        cleaned[:name] = stripsub(sname)
        cleaned[:direction] = direction
        cleaned[:hascase] = hascase
        return cleaned
    end
    def sanitizeCountry(isoID, cname, offiname, population)
        cleaned = {}
        cleaned[:isoID] = isoID
        cleaned[:name] = stripsub(cname)
        cleaned[:offiname] = stripsub(offiname)
        cleaned[:population] = population.to_i
        return cleaned
    end
end
