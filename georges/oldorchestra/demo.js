
function isDate(sDate){
    var dateRegEx = sDate.match(/^(?:0?([1-9]|[12]\d|3[01]))\/(?:0?([1-9]|1[0-2]))\/((?:19|[2-9]\d)[0-9]{2})$/);
    if (!dateRegEx)
        return false;
    var iDay = dateRegEx[1];
    var iMonth = dateRegEx[2];
    var iYear = dateRegEx[3];
    var arDayPerMonth = [31, (isLeapYear(iYear)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (!arDayPerMonth[iMonth - 1])
        return false;
    return (iDay <= arDayPerMonth[iMonth - 1] && iDay > 0);
}

function isHour(sHour){
    var hourRegEx = /^(?:0?[0-9]|1\d|2[0-3]):(?:0?[0-9]|[0-4]\d|5[0-9])$/.test(sHour);
    return hourRegEx;
}

function isLeapYear(iYear){
    return ((iYear % 4 == 0 && iYear % 100 != 0) || iYear % 400 == 0);
}

function isDateHour(id){
    var sDateHour = document.getElementById(id).value;
    var sSeparator = ' ';
    var arDateHour = sDateHour.split(sSeparator);
    var ok
    if (!arDateHour[0])
        ok = false;
    else {
        if (!isDate(arDateHour[0]))
            ok = false;
        else {
            if (arDateHour[1] == "") {
                document.getElementById(id).value += '00:00';
                ok = true;
            }
            else
            if (!arDateHour[1]) {
                document.getElementById(id).value += ' 00:00';
                ok = true;
            }
            else {
                if (!isHour(arDateHour[1]))
                    ok = false;
                else
                    ok = true;
            }
        }
    }
    if (ok) {
        return true;
    }
    else {
        return false;
    }
}

function isDateHour_block(id_case, submit){
    if(isDateHour(id_case)){
        document.getElementById(id_case+"_legende").style.color = '';
        document.getElementById(id_case).style.color = '';
        document.getElementById(submit).disabled = false;
        return true;
    } else{
        document.getElementById(id_case+"_legende").style.color = 'red';
        document.getElementById(id_case).style.color = 'red';
        document.getElementById(submit).disabled = true;
        return false;
    }
}

// ça veut l'id CSS du select à remplir et l'id de la promo pour recuperer ses infos
function populateSteps(id_step_list, id_promo){
    var steps = getPromoSteps(id_promo);
    document.getElementById(id_step_list).length = 0;
    var options = '';
    for(var i = 0; i < steps;i++)
    {
        options += '<option value="'+(i+1)+'">Etape '+(i+1)+'</option>';
    }
    options += '<option value="'+(steps+1)+'">Nouvelle Etape </option>';
    $("#"+id_step_list).append(options);
}
function updatePeriod(id_select, id_date_name, id_date_start, id_date_end, id_submit){
    var id_period =  $("#"+id_select).val();
    if(id_period == 0){
        $("#"+id_date_name).val("");
        $("#"+id_date_start).val("");
        $("#"+id_date_end).val("");
        $("#"+id_date_name).attr('disabled',false);
        $("#"+id_date_start).attr('disabled',false);
        $("#"+id_date_end).attr('disabled',false);
        isDateHour_block(id_date_start, id_submit);
        isDateHour_block(id_date_end, id_submit);
    } else {
        $("#"+id_date_name).val(periods[id_period].name);
        $("#"+id_date_start).val(timestampToString(parseInt(periods[id_period].start)));
        $("#"+id_date_end).val(timestampToString(parseInt(periods[id_period].end)));
        $("#"+id_date_name).attr('disabled',true);
        $("#"+id_date_start).attr('disabled',true);
        $("#"+id_date_end).attr('disabled',true);
        isDateHour_block(id_date_start, id_submit);
        isDateHour_block(id_date_end, id_submit);
    }
}
function timestampToString(timestamp){
    var d = new Date(timestamp*1000);
    return  $.strftime( '%d/%m/%Y %H:%M' , d );
}
function disablePromo(id){
    $("#detailPromo_"+id).hide(500);
}
function disableCategory(id){
    $("#detailCategory_"+id).hide(500);
}
function enablePromo(id){
    $("#detailPromo_"+id).show(500);
}
function enableCategory(id){
    $("#detailCategory_"+id).show(500);
}
function selectCategory(id){
    enableCategory(id);
    disablePromo(id);
}
function selectPromo(id){
    enablePromo(id);
    disableCategory(id);
}
function selectNormal(id){
    disablePromo(id);
    disableCategory(id);
}
