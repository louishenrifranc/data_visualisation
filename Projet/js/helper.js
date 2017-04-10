function get_attributes_for_id(i) {
    if (i == 0) {
        return "Ambitieux";
    } else if (i == 1) {
        return "Fun";
    } else if (i == 2) {
        return "Intérêts  similaires";
    } else if (i == 3) {
        return "Attractivité physique";
    } else if (i == 4) {
        return "Sincérité";
    } else if (i == 5) {
        return "Intelligence";
    }
}

function find_max_diff_attribute(values1, values2, max = true) {
    max_diff = 0;
    if (!max) max_diff = 101
    iter = 0
    indice_max_diff = null;
    for (var key in values1) {
        if (values1.hasOwnProperty(key)) {
            diff = Math.abs(values1[key] - values2[key]);
            if ((max && max_diff < diff) || (!max && max_diff > diff)) {
                max_diff = diff;
                indice_max_diff = get_attributes_for_id(iter)
            }
        }
        iter += 1
    }
    return indice_max_diff
}


function load_d3_visualisation() {
    lineChart("#linechart", "data/corr_vs_matches.csv");
    heatmapChart("#heatmap1", "data/corr_race_race_matches.csv", ["African American", "Caucasian American", "Hispanic", "Asian", "Other"]);
    heatmapChart("#heatmap2", "data/corr_age_age_matches.csv", ["- de 22", "22-23", "24-27", "28-31", "32-36", "+ de 36"]);
    heatmapChart("#heatmap3", "data/corr_field_cd_field_cd_matches.csv", ["Science", "Science sociales", "Littérature", "Art", "Commerce", "Education", "Autre"]);

    // Question 2 loading
    var ringNote = d3.ringNote()
        .draggable(false);
    var q = queue();
    q.defer(d3.json, "data/female_experience.json")
    q.defer(d3.json, "data/female_expectation.json")
    q.await(function(error, data1, data2) {
        if (error) throw error;
        var svg1 = display_radar_char("#q2_radar_chart1", data1, data2, "Désir des Femmes Versus Choix", "Critères de Désir des femmes", "Critères de Séléction des  Femmes");
        annotations(svg1, "attractive", 0, "Les femmes ont une forte tendance à être désireuse d\'hommes attractifs", 80, -20)
    })

    var q1 = queue();
    q1.defer(d3.json, "data/male_experience.json")
    q1.defer(d3.json, "data/male_expectation.json")
    q1.await(function(error, data1, data2) {
        if (error) throw error;
        data = data1;
        var svg0 = display_radar_char("#q2_radar_chart2", data1, data2, "Désir des Hommes Versus Choix", "Critères de Désir des Hommes", "Critères de Séléction des  Hommes");
        annotations(svg0, "attractive", 1, "A l'inverse les hommes portent plus d'attention à l'apparence qu'ils ne le pensent", 50, 0)

    })


    // Question 3 loading 
    var q2 = queue();
    q2.defer(d3.json, "data/male_own_opninon.json")
    q2.defer(d3.json, "data/female_expectation.json")
    q2.await(function(error, data1, data2) {
        if (error) throw error;
        var svg3 = display_radar_char("#q3_radar_chart1", data1, data2, "Hommes, qu'est ce qui intéresse les Femmes", "Réponse des Hommes", "Réalité");
        annotations(svg3, "intelligence", 1, "Il est intéressant de voir que les hommes sous-estiment l'intérêt des femmes pour leur intelligence et leur sincerité.", 200, 90);
    })

    var q3 = queue();
    q3.defer(d3.json, "data/female_own_opninon.json")
    q3.defer(d3.json, "data/male_expectation.json")
    q3.await(function(error, data1, data2) {
        if (error) throw error;
        var svg2 = display_radar_char("#q3_radar_chart2", data1, data2, "Femmes, qu'est ce qui intéresse les Hommes", "Réponse des Femmes", "Réalité");
        annotations(svg2, "fun", 0, "Les femmes sont globalement plus lucides que les hommes", -40, -120)

    })

    // Question 4 loading
    parallelCoord("#parallelCoordinate", "data/best_matcher.csv")
}

function submitOrder() {
    // Set the css user_mode to true
    $('.user_mode').css({
        'display': 'block'
    });
    document.getElementById('testez-vous').setAttribute("disabled", false)

    // Nice adjectives
    nice_adjectif = ["raffiné", "charmant", "attentionné", "altruiste"]

    //  Update the question 3
    values = Object()
    d3.selectAll('#rangebox .range').each(function() {
        var id = d3.select(this).attr('data-id');
        if (id == 0) {
            values.ambitious = this.value;
        } else if (id == 1) {
            values.fun = this.value;
        } else if (id == 2) {
            values.same_interests = this.value;
        } else if (id == 3) {
            values.attractive = this.value;
        } else if (id == 4) {
            values.sincerity = this.value;
        } else if (id == 5) {
            values.intelligence = this.value;
        }
    });

    profile = Object()
    profile.gender = document.getElementById('gender').value
    profile.age = document.getElementById('age').value
    profile.studies = document.getElementById('studies').value
    profile.nbDate = document.getElementById('nb-date').value
    profile.nbSortie = document.getElementById('nb-sortie').value
    profile.origine = document.getElementById('origine').value

    gender = document.getElementById('gender').value

    if (gender == "Femme") {
        // Question 2 loading
        var q = queue();
        q.defer(d3.json, "data/female_experience.json")
        q.defer(d3.json, "data/female_expectation.json")
        q.await(function(error, data1, data2) {
            if (error) throw error;
            d3.select("#q2_radar_chart1 svg").remove();

            var svg4 = display_radar_char("#q2_radar_chart1", data1, data2, "Désir des Femmes Versus votre Désir Versus Choix des Femmes", "Critères de Désir des femmes", "Critères de Séléction des  Femmes", values);
            max_dif_attribute = find_max_diff_attribute(data1, values)
            min_dif_attribute = find_max_diff_attribute(data1, values, false)

            d3.select("#question2-perso-text").text(
                "Vous êtes quelqu'un d'unique, et de " + nice_adjectif[Math.floor(Math.random() * nice_adjectif.length)] + " et cela s'est tout de suite vu. " +
                ". Vous vous différentiez de vos paires, car vous êtes bien plus intéressé par l'attribut " +
                max_dif_attribute +
                ". Cependant comme vous l'avez certainement vu sur le spider-chart, vous semblez être dans la moyenne quand il s'agit de " + min_dif_attribute)
        })
    } else if (gender == "Homme") {
        var q1 = queue();

        q1.defer(d3.json, "data/male_experience.json")
        q1.defer(d3.json, "data/male_expectation.json")
        q1.await(function(error, data1, data2) {
            if (error) throw error;

            d3.select("#q2_radar_chart2 svg").remove();
            var svg1 = display_radar_char("#q2_radar_chart2", data1, data2, "Désir des Hommes Versus votre Désir Versus Choix des Hommes", "Critères de Désir des Hommes", "Critères de Séléction des Hommes", values);
            max_dif_attribute = find_max_diff_attribute(data1, values)
            min_dif_attribute = find_max_diff_attribute(data1, values, false)

            d3.select("#question2-perso-text").text(
                "Vous êtes quelqu'un d'unique, et de " + nice_adjectif[Math.floor(Math.random() * nice_adjectif.length)] + " et cela s'est tout de suite vu. " +
                ". Vous vous différentiez de vos paires, car vous êtes bien plus intéressé par l'attribut " +
                max_dif_attribute +
                ". Cependant comme vous l'avez certainement vu sur le spider-chart, vous semblez être dans la moyenne quand il s'agit de " + min_dif_attribute)

        })
    }

    d3.csv("data/best_matcher.csv", function(error, persons) {

        current_best_score = 0
        nb_best_score = 0.0
        mean_best_match = 0.0

        persons.forEach(function(person){
            
            current_score = 0
            if(person[ "genre" ]==profile.gender){
                current_score += 16
            }
            if(person[ "domaine d'études" ]==profile.studies){
                current_score += 4
            }
            if(person[ "âge" ]==profile.age){
                current_score += 3
            }
            if(person[ "origine éthnique" ]==profile.origine){
                current_score += 4
            }
            if(person[ "fréquence de date" ]==profile.nbDate){
                current_score += 2
            }
            if(person[ "fréquence de sortie" ]==profile.nbSortie){
                current_score += 2
            }
            
            if (current_score > current_best_score){
                current_best_score = current_score;
                nb_best_score = 0.0;
                mean_best_match = 0.0
            }

            if(current_score == current_best_score){
                nb_best_score += 1.0;
                mean_best_match += parseInt(person["nombre de matches"])

            }


        })

        mean_best_match = mean_best_match / nb_best_score
        console.log(mean_best_match)

    });


}
