$(() => {

    /// show / hide addform partial in rewardspage
    $('#add').click(() => {
        if ($('#addform').hasClass('hide')) $('#addform').removeClass('hide')
        else $('#addform').addClass('hide')
    })

    /// initialize datatable for rewardspage
    $('#table_id').DataTable();


    /// adding / edit rewards form
    $('#btn-submit').click(function(e) {
        e.preventDefault();
        swal({
            title: 'Are you sure to proceed?',
            dangerMode: true,
            buttons: true,
            closeOnClickOutside: true,
        }).then(function(isConfirmed) {
            if(isConfirmed) $('#myForm').submit();
            else e.preventDefault();
        });
    });

    /// delete form
    $('#btn-delete').click(function(e) {
        e.preventDefault();
        swal({
            title: 'Are you sure to proceed?',
            dangerMode: true,
            buttons: true,
            closeOnClickOutside: true,
        }).then(function(isConfirmed) {
            if(isConfirmed) $('#myFormDelete').submit();
            else e.preventDefault();
        });
    });
    
})
