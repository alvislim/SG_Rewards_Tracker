$(() => {
    /// show / hide addform partial in rewardspage
    $('#add').click(() => {
        if ($('#addform').hasClass('hide')) $('#addform').removeClass('hide')
        else $('#addform').addClass('hide')
    })

    /// initialize datatable for rewardspage
    $('#table_id').DataTable({ 
        responsive: true,
        "scrollY":        "400px",
        "scrollX":        "400px",
        "scrollCollapse": true,
        "paging":         false,
        dom: 'Bfrtip',
        buttons: [
            "csv", "pdf", "print"
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            btns.addClass('btn btn-dark btn-sm');
            btns.removeClass('dt-button');
        }
    });


    /// adding / edit rewards form
    $('#btn-submit').click(function (e) {
        e.preventDefault();
        swal({
            title: "Are your inputs correct?",
            text: "Else u can edit them in the rewards page overview :)",
            icon: 'warning',
            buttons: {
                cancel: true,
                delete: 'Ok'
            }
        }).then(function (isConfirmed) {
            if (isConfirmed) $('#myForm').submit();
            else e.preventDefault();
        });
    });

    // delete form
    // $('.btn-delete').click(function (e) {
    //     e.preventDefault();
    //     swal({
    //         title: "Are you sure?",
    //         text: "You will not be able to recover this imaginary rewards!",
    //         icon: 'warning',
    //         buttons: {
    //             cancel: true,
    //             delete: 'Yes, Delete It'
    //         }
    //     }).then(function (isConfirmed) {
    //         if (isConfirmed) $('#myFormDelete').submit();
    //         else e.preventDefault();
    //     });
    // });

})

