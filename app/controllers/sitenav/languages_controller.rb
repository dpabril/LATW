class Sitenav::LanguagesController < ApplicationController
  def index
    puts "Language Index"
    query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Language;
        "
        )
    @index_list = {}
    for lang in query.to_hash.sort_by { |row| row["name"] } do
        if !@index_list.key?(lang["name"][0])
            @index_list[lang["name"][0]] = [lang]
        else
            @index_list[lang["name"][0]].push(lang)
        end
    end
  end
  def one
    @isoID = params[:id]
    # Querying for the language specified by @isoID
    @lang_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT *
        FROM Language
        WHERE ISOid = '%s';
        " % @isoID
        )[0]
    if @lang_query.blank?
        # render 404
        # return
    end
    # Querying for the dialects of the language as defined by the languageHasDialect relation
    @dias_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT name
        FROM Dialect
        WHERE ISOid = '%s';
        " % @isoID
        )
    # Querying for the language family where the language belongs as defined by the languageBelongsTo relation
    @lfam_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT name
        FROM LanguageFamily
        WHERE name IN (SELECT lfamID
                       FROM languageBelongsTo
                       WHERE langID = '%s');
        " % @isoID
        )[0]
    # Querying for the countries where the language is a national language as defined by the isSpokenIn relation
    @countries_natl_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Country
        WHERE ISOid IN (SELECT countryID
                        FROM isSpokenIn
                        WHERE langID = '%s'
                          AND isNational = true);
        " % @isoID
        )
    # Querying for the countries where the language is spoken as defined by the isSpokenIn relation
    @countries_spoken_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Country
        WHERE ISOid IN (SELECT countryID
                        FROM isSpokenIn
                        WHERE langID = '%s');
        " % [@isoID, @isoID]
        )
    @scripts_query = ActiveRecord::Base.connection.exec_query(
        "
        SELECT ISOid, name
        FROM Script
        WHERE ISOid IN (SELECT scriptID
                        FROM languageUsesScript
                        WHERE langID = '%s');
        " % @isoID
        )

    if @dias_query.present?
        @dias_query.to_hash.sort_by! { |row| row["name"] }
    end
    if @countries_natl_query.present?
        @countries_natl_query.to_hash.sort_by! { |row| row["name"] }
    end
    if @countries_spoken_query.present?
        @countries_spoken_query.to_hash.sort_by! { |row| row["name"] }
    end
    if @scripts_query.present?
        @scripts_query.to_hash.sort_by! { |row| row["name"] }
    end

    # Admin
    if signed_in
        countries_list_for_add_national = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Country
            WHERE ISOid NOT IN (SELECT countryID
                                FROM isSpokenIn
                                WHERE langID = '%s'
                                  AND isNational = TRUE);
            " % @isoID
            )
        countries_list_for_add_spoken = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Country
            WHERE ISOid NOT IN (SELECT countryID
                                FROM isSpokenIn
                                WHERE langID = '%s');
            " % @isoID
            )
        scripts_list_for_add_written = ActiveRecord::Base.connection.exec_query(
            "
            SELECT ISOid, name
            FROM Script
            WHERE ISOid NOT IN (SELECT scriptID
                                FROM languageUsesScript
                                WHERE langID = '%s');
            " % @isoID
            )
        if countries_list_for_add_national.present?
            @countries_list_for_add_national = ""
            countries_list_for_add_national.to_hash.sort_by! { |row| row["name"] }
            countries_list_for_add_national.each do |country|
                @countries_list_for_add_national += "<option value=\"%s\">%s</option>" % [country["isoid"], country["name"]]
            end
        end
        if countries_list_for_add_spoken.present?
            @countries_list_for_add_spoken = ""
            countries_list_for_add_spoken.to_hash.sort_by! { |row| row["name"] }
            countries_list_for_add_spoken.each do |country|
                @countries_list_for_add_spoken += "<option value=\"%s\">%s</option>" % [country["isoid"], country["name"]]
            end
        end
        if scripts_list_for_add_written.present?
            @scripts_list_for_add_written = ""
            scripts_list_for_add_written.to_hash.sort_by! { |row| row["name"] }
            scripts_list_for_add_written.each do |script|
                @scripts_list_for_add_written += "<option value=\"%s\">%s</option>" % [script["isoid"], script["name"]]
            end
        end
    end
  end
end
