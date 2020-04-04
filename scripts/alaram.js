$(document).ready(() => {
    $('.statsDiv').hide();
    loadData();
});

let newGProductId = 1;

let priorities = [{
        id: 1,
        type: 'Low'
    },
    {
        id: 2,
        type: 'Medium'
    },
    {
        id: 3,
        type: 'High'
    },
    {
        id: 4,
        type: 'Critical'
    }
]

let statusCodes = [{
        id: 1,
        type: 'In-Progress'
    },
    {
        id: 2,
        type: 'On-Hold'
    },
    {
        id: 3,
        type: 'Completed'
    },
    {
        id: 4,
        type: 'Closed'
    },
    {
        id: 5,
        type: 'Open'
    },
    {
        id: 6,
        type: 'Scope Dropped'
    },
    {
        id: 7,
        type: 'Client Awaiting'
    },
    {
        id: 8,
        type: 'Duplicate'
    },
]

let users = [{
        id: 1,
        name: 'Sanjay'
    },
    {
        id: 2,
        name: 'Aswani'
    },
    {
        id: 3,
        name: 'Kalpana'
    }
]

let productInfo = [{
        prodId: randomNumber(),
        prodName: 'Iphone',
        proposalDate: '2020-03-01',
        deliveredDate: '2020-04-15',
        currentStatus: 3,
        priority: 3,
        sUser: 1,
        remarks: 'No remarks',
        class: ''
    },
    {
        prodId: randomNumber(),
        prodName: 'Samsung',
        proposalDate: '2020-03-01',
        deliveredDate: '2020-04-04',
        currentStatus: 6,
        priority: 1,
        sUser: 2,
        remarks: 'No remarks',
        class: ''
    },
    {
        prodId: randomNumber(),
        prodName: 'Oneplus',
        proposalDate: '2020-03-01',
        deliveredDate: '2020-04-03',
        currentStatus: 8,
        priority: 3,
        sUser: 1,
        remarks: 'No remarks',
        class: ''
    }, {
        prodId: randomNumber(),
        prodName: 'Nokia',
        proposalDate: '2020-03-01',
        deliveredDate: '2020-03-25',
        currentStatus: 6,
        priority: 2,
        sUser: 3,
        remarks: 'No remarks',
        class: ''
    }, {
        prodId: randomNumber(),
        prodName: 'MI',
        proposalDate: '2020-03-01',
        deliveredDate: '2020-04-10',
        currentStatus: 6,
        priority: 1,
        sUser: 2,
        remarks: 'No remarks',
        class: ''
    }
];
// productInfo = [];
newGProductId = 1;
totalItems = 0;
completedItems = 0;

// productInfo = Enumerable.from(productInfo).where((x) => x.currentStatus === 3);



function loadData() {
    console.log("Logg");
    let alaramBody = '';
    $('#tbody').find('tr').remove();
    productInfo.forEach(product => {
        alaramBody += `<tr id="${product.prodId}">
                            <td><div  col_name="prodId">${product.prodId} </div></td>
                            <td><input type="text" name="" id="" class="row_data prod${product.prodId} disabled" col_e_msg="Enter product name"   col_name="prodName" value="${product.prodName}"></td>
                            <td><input type="date" name="" id="" class="row_data prod${product.prodId} disabled" col_e_msg="Enter proposal date"  col_name="proposalDate" value="${product.proposalDate}"></td>
                            <td><input type="date" name="" id="" class="row_data prod${product.prodId} disabled" col_e_msg="Enter delivery date"   col_name="deliveredDate" value="${product.deliveredDate}"></td>
                            <td>${getCurrentStatus(product.currentStatus, product.prodId)}</td>
                            <td>${getPriorities(product.priority, product.prodId)}</td>
                            <td>${getUser(product.sUser, product.prodId)}</td>
                            <td><input type="text" name="" id="" class="row_data prod${product.prodId} disabled" col_e_msg="Enter remarks"   col_name="remarks" value="${product.remarks}"></td>
                            <td><div class="row_data btnDiv"  col_name="Actions">${getAction(product.prodId)} </div></td>
                        </tr>`;
    });
    $('#tbody').html(alaramBody);
    $('.master').show();
    setTimeout(() => {
        productInfo.forEach(prod => {
            checkProdStatus(prod.prodId);
        });
    }, 200);
}

function getCurrentStatus(statusId, prodId) {
    let statusInfo = '';
    if (+prodId === 0) {
        statusInfo += `<select class="prod${prodId} contentEd" col_name="currentStatus">`;
    } else {
        statusInfo += `<select class="prod${prodId} disabled" col_name="currentStatus">`;
    }
    statusCodes.forEach(status => {
        if (+status.id === +statusId) {
            statusInfo += `<option value='${status.id}' selected>${status.type}`;
        } else {
            statusInfo += `<option value='${status.id}' >${status.type}`;
        }
    });
    statusInfo += '</select>';
    return statusInfo;
}

function getPriorities(priorityId, prodId) {
    let priorityInfo = '';
    if (+prodId === 0) {
        priorityInfo += `<select class="prod${prodId} contentEd" col_name="priority">`;
    } else {
        priorityInfo += `<select class="prod${prodId} disabled" col_name="priority">`;
    }

    priorities.forEach(priority => {
        if (+priority.id === +priorityId) {
            priorityInfo += `<option value='${priority.id}' selected>${priority.type}`;
        } else {
            priorityInfo += `<option value='${priority.id}' >${priority.type}`;
        }
    });
    priorityInfo += '</select>';
    return priorityInfo;
}


function getUser(userId, prodId) {
    let userInfo = '';
    if (+prodId === 0) {
        userInfo += `<select class="prod${prodId} contentEd" col_name="user">`;
    } else {
        userInfo += `<select class="prod${prodId} disabled" col_name="user">`;
    }

    users.forEach(user => {
        if (+user.id === +userId) {
            userInfo += `<option value='${user.id}' selected>${user.name}`;
        } else {
            userInfo += `<option value='${user.id}' >${user.name}`;
        }
    });
    userInfo += '</select>';
    return userInfo;
}

function getAction(productId) {
    let actionDiv = '';
    actionDiv += `<span class="fa fa-pencil-square-o btn_edit prodE${productId}" aria-hidden="true" onclick="editProduct(${productId})"></span>`;
    actionDiv += `<span class="fa fa-floppy-o btn btn_save prodS${productId} hide" aria-hidden="true" onclick="saveProduct(${productId})"></span>`;
    actionDiv += `<span class="fa fa-times-circle btn btn_cancel prodC${productId} hide" aria-hidden="true" onclick="cancelProduct(${productId})"></span>`;
    return actionDiv
}


function editProduct(productId) {
    cancelProduct(productId);
    let className = `prod${productId}`;
    $(`.${className}`)
        .removeClass('disabled')
        .addClass('contentEd');
    // const htmlTDelement = document.getElementsByClassName(className);
    // for (let index = 0; index < htmlTDelement.length; index++) {
    //     const element = htmlTDelement[index];
    //     element.classList.add('contentEd');
    // }
    $(`.prodE${productId}`).hide();
    $(`.prodS${productId}`)
        .removeClass('hide')
        .addClass('show');
    $(`.prodC${productId}`)
        .removeClass('hide')
        .addClass('show');

}


function saveProduct(productId) {

    let className = `prod${productId}`;
    const htmlTDelement = document.getElementsByClassName(className);
    const rNum = randomNumber()
    let newObjec = {};
    if (+productId === 0) {

        if (rNum !== 0) {
            newObjec.prodId = rNum;
        } else {
            saveProduct(0);
            return;
        }
    }

    if (checkValues(htmlTDelement)) {
        for (let index = 0; index < htmlTDelement.length; index++) {
            const element = htmlTDelement[index];
            const colname = $(element).attr('col_name');
            if (element.value.trim() === '') {
                let errorMsg = $(element).attr('col_e_msg');
                errorObject.push({
                    msg: errorMsg
                });
            }
            newObjec[colname] = element.value;
            if (+productId > 0) {
                const _index = productInfo.findIndex(p => +p.prodId === +productId);
                if (+_index > -1) {
                    productInfo[+_index][colname] = element.value;
                }
            } else {
                newObjec[colname] = element.value;
            }
        }

        if (+productId === 0) {
            productId = newGProductId;
            productInfo = [...productInfo, newObjec];
            loadData();
        } else {

            cancelProduct(productId);
            checkProdStatus(productId);
        }
    }

}

function checkValues(htmlTDelement) {
    const errorObject = [];
    let newObjec = {};
    for (let index = 0; index < htmlTDelement.length; index++) {
        const element = htmlTDelement[index];
        const colname = $(element).attr('col_name');
        if (element.value.trim() === '') {
            let errorMsg = $(element).attr('col_e_msg');
            errorObject.push({
                msg: errorMsg
            });
        }
        newObjec[colname] = element.value;
    }
    if (errorObject.length === 0) {
        let dd = new Date(newObjec['deliveredDate']);
        let pd = new Date(newObjec['proposalDate']);
        if (dd < pd) {
            errorObject.push({
                msg: 'delivery date cont be less than proppsal date'
            })
        }
    }

    console.log(errorObject);
    console.log(newObjec);

    if (errorObject.length > 0) {
        let errorLis = '';
        errorObject.forEach((error, index) => {
            errorLis += `<li>${index+1}) ${error.msg}</li>`
        });
        $('.error-div')
            .removeClass('hide')
            .addClass('show')
            .find('ul').html(errorLis);
        return false;
    } else {
        return true;
    }
}

function closeError() {
    $('.error-div')
        .removeClass('show')
        .addClass('hide')
        .find('ul').html('');
}

function cancelProduct(pId) {
    if (pId === 0) {
        document.getElementById(pId).remove();
    }
    $('#prodTable td input').removeClass("contentEd").addClass('disabled');
    $('#prodTable td select').removeClass("contentEd").addClass('disabled');
    $('#prodTable td div').removeAttr("contenteditable");
    $('.btn_edit').show();
    $(`.btn`)
        .removeClass('show')
        .addClass('hide');
    $(`.btn`)
        .removeClass('show')
        .addClass('hide');
}

function checkProdStatus(productId) {
    const prodInfo = productInfo.filter(_p => +_p.prodId === +productId);
    if (prodInfo.length === 1) {
        const cd = new Date();
        const pdd = new Date(prodInfo[0]['deliveredDate']);
        let classN = '';
        $(`#${productId}`).css('background-color', 'none');
        if (+prodInfo[0]['currentStatus'] === 3 || +prodInfo[0]['currentStatus'] === 4) {
            $(`#${productId}`).css('background-color', 'white');
            classN = 'w';
        } else if (pdd > cd) {
            $(`#${productId}`).css('background-color', 'white');
            classN = 'w';
        } else {
            const difdays = (cd.getTime() - pdd.getTime()) / (1000 * 3600 * 24);
            if (difdays > 2) {
                $(`#${productId}`).css('background-color', 'red');
                classN = 'r';
            } else {
                $(`#${productId}`).css('background-color', '#eca218');
                classN = 'a';
            }
        }
        productInfo.forEach((prd) => {
            if (+prd.prodId === +productId) {
                prd.class = classN;
            }
        })
    }
    showStatistics();
}

function appendData() {
    let alaramBody = '';
    const rNum = 0;
    let actionDiv = '';
    actionDiv += `<span class="fa fa-floppy-o btn btn_save prodS${rNum}" aria-hidden="true" onclick="saveProduct(${rNum})"></span>`;
    actionDiv += `<span class="fa fa-times-circle btn btn_cancel prodC${rNum}" aria-hidden="true" onclick="cancelProduct(${rNum})"></span>`;
    alaramBody += `<tr id="${rNum}">
                        <td><div  col_name="prodId">${rNum} </div></td>
                        <td><input type="text" name="" id="" class="row_data prod${rNum} contentEd" col_e_msg="Enter product name"   col_name="prodName" value=""></td>
                        <td><input type="date" name="" id="" class="row_data prod${rNum} contentEd" col_e_msg="Enter proposal date"  col_name="proposalDate" value=""></td>
                        <td><input type="date" name="" id="" class="row_data prod${rNum} contentEd" col_e_msg="Enter delivery date"  col_name="deliveredDate" value=""></td>
                        <td>${getCurrentStatus(1, rNum)}</td>
                        <td>${getPriorities(1, rNum)}</td>
                        <td>${getUser(1, rNum)}</td>
                        <td><input type="text" name="" id="" class="row_data prod${rNum} contentEd" col_e_msg="Enter remarks"     col_name="remarks" value=""></td>
                        <td><div class="row_data btnDiv"  col_name="Actions">${actionDiv} </div></td>
                    </tr>`;
    $('#tbody').append(alaramBody);
}

function randomNumber() {
    return newGProductId++;
}


function showStatistics() {
    $('#statisticsDiv').show();
    console.table(productInfo);

    // Status Stats
    $('#statsStatusTr').find('tr').remove();
    $('#tbodyStatusStats').find('tr').remove();
    let statusTableTR = '<tr><th></th>';
    for (let index = 0; index < statusCodes.length; index++) {
        statusTableTR += `<th>${statusCodes[index].type}</th>`
    }
    statusTableTR += `<td></td>`
    statusTableTR += `</tr>`
    $('#statsStatusTr').html(statusTableTR);
    $('#statsUserTr').html(statusTableTR);
    let statsBody = '';
    for (let p = 0; p < priorities.length; p++) {
        statsBody += `<tr>`;
        statsBody += `<td style="background-color: yellow;color: black;">${priorities[p].type}</td>`;
        for (let s = 0; s < statusCodes.length; s++) {
            statsBody += `<td>${getValues(priorities[p].id,statusCodes[s].id)}</td>`;
        }
        statsBody += `<td>${getpriorityCount(priorities[p].id)}</td>`
        statsBody += `</tr>`;

        if (+p === (priorities.length) - 1) {
            statsBody += `<tr>`;
            statsBody += `<td></td>`;
            for (let s = 0; s < statusCodes.length; s++) {
                statsBody += `<td>${getStatusCount(statusCodes[s].id)}</td>`;
            }
            statsBody += `<td></td>`
            statsBody += `</tr>`;
        }
    }
    console.log(statsBody);
    $('#tbodyStatusStats').html(statsBody);


    let statsUserBody = '';
    for (let p = 0; p < users.length; p++) {
        statsUserBody += `<tr>`;
        statsUserBody += `<td>${users[p].name}</td>`;
        for (let s = 0; s < statusCodes.length; s++) {
            statsUserBody += `<td>${getUserValues(users[p].id,statusCodes[s].id)}</td>`;
        }
        statsUserBody += `<td>${getUserCount(users[p].id)}</td>`;
        statsUserBody += `</tr>`;
        if (+p === (users.length) - 1) {
            statsUserBody += `<tr>`;
            statsUserBody += `<td></td>`;
            for (let s = 0; s < statusCodes.length; s++) {
                statsUserBody += `<td>${getStatusCount(statusCodes[s].id)}</td>`;
            }
            statsUserBody += `<td></td>`
            statsUserBody += `</tr>`;
        }
    }
    console.log(statsUserBody);
    $('#tbodyUserStats').html(statsUserBody);


    let flagColorCount = '';
    flagColorCount += `<tr>
                            <td>${getFlagCount('w')}</td>
                            <td>${getFlagCount('a')}</td>
                            <td>${getFlagCount('r')}</td>
                        </tr>`;
    $('#tbodyflagCount').html(flagColorCount)


    let currentStatus = '';
    currentStatus += `<tr>`;
    currentStatus += `<td>Total Items</td>`;
    currentStatus += `<td>${getTotalItems()}</td>`;
    currentStatus += `</tr>`;
    currentStatus += `<tr>`;
    currentStatus += `<td>progress (Completed)</td>`;
    currentStatus += `<td>${getTotalCItems()}</td>`;
    currentStatus += `</tr>`;
    currentStatus += `<tr style="background-color: #63b763">`;
    currentStatus += `<td>pending Tasks</td>`;
    currentStatus += `<td>${getTotalPItems()}</td>`;
    currentStatus += `</tr>`;
    currentStatus += `<tr>`;
    currentStatus += `<td>Completion %age</td>`;
    currentStatus += `<td>${getPercentage()}</td>`;
    currentStatus += `</tr>`;

    $('#tbodyCStatus').html(currentStatus);


}

function getValues(priorityId, statusId) {
    return productInfo.filter((pInfo) =>
        +(pInfo.priority) === +priorityId && +(pInfo.currentStatus) === +statusId
    ).length;
}

function getpriorityCount(priorityId) {
    return productInfo.filter((pInfo) =>
        +(pInfo.priority) === +priorityId
    ).length;
}

function getStatusCount(statusId) {
    return productInfo.filter((pInfo) =>
        +(pInfo.currentStatus) === +statusId
    ).length;
}

function getUserCount(userId) {
    return productInfo.filter((pInfo) =>
        +(pInfo.sUser) === +userId
    ).length;
}

function getUserValues(userId, statusId) {
    return productInfo.filter((pInfo) =>
        +(pInfo.sUser) === +userId && +(pInfo.currentStatus) === +statusId
    ).length;
}

function getFlagCount(flag) {
    return productInfo.filter((pInfo) =>
        pInfo.class === flag
    ).length;
}

function getTotalItems() {
    totalItems = productInfo.filter((pInfo) =>
        +(pInfo.currentStatus) !== 2 && +(pInfo.currentStatus) !== 6
    ).length;
    return totalItems;
}

function getTotalCItems() {
    completedItems = productInfo.filter((pInfo) =>
        +(pInfo.currentStatus) === 3 || +(pInfo.currentStatus) === 4
    ).length;
    return completedItems;
}

function getTotalPItems() {
    return productInfo.filter((pInfo) =>
        +(pInfo.currentStatus) !== 2 && +(pInfo.currentStatus) !== 6 && +(pInfo.currentStatus) !== 3 && +(pInfo.currentStatus) !== 4
    ).length;
}

function getPercentage() {
    return Math.round(completedItems * 100 / totalItems);
}

function showDivs(divPannel) {
    $('.statsDiv').hide();
    $(`.${divPannel}`).show();
}