"use strict";

/* =====================================================
   LOGIN
===================================================== */

const LOGIN_ID = "jd2106";
const LOGIN_PASSWORD = "955895";
const LOGIN_STORAGE = "eco_logged_in_persistent";


/* =====================================================
   SETTINGS
===================================================== */

const HSN_START = 1910;
const DEFAULT_HSN = String(HSN_START);

const DEFAULT_UPI =
    "jdhameliya21@oakicici";

const STORAGE =
    "eco_pellets_invoices_v5";


/* =====================================================
   PRODUCTS
===================================================== */

const PRODUCT_OPTIONS = [
    "PINE WOOD PELLETS 1MM",
    "PINE WOOD PELLETS 2MM",
    "PINE WOOD PELLETS 3MM",
    "PINE WOOD PELLETS 4MM",
    "PINE WOOD PELLETS 5MM",
    "PINE WOOD PELLETS 6MM"
];


/* =====================================================
   COMPANY
===================================================== */

const COMPANY = {

    company:
        "Eco Pellets Industries",

    gstin:
        "24CSGPD468M1ZG",

    address:
        "PLOT NO. 1 / 2 S.NO. 84, AT. DEMALIYA, DEMALIYA DEHGAM, ROAD OPP ASHIRWAD FARM, TA. DEHGAM, Demaliya, Ahmedabad, Gujarat 382433",

    state:
        "Gujarat",

    phone:
        "9558950908",

    email:
        "jainildhameliya21@gmail.com",

    authorizedPerson:
        "JAINIL DHAMELIYA",

    designation:
        "Owner",

    bank:
        "Name: VARSHABAHEN VIJAYKUMAR DHAMELIYA\n\n" +
        "IFSC Code: COSB0000072\n\n" +
        "Account No: 072100107214\n\n" +
        "Bank: Cosmos Co-operative Bank, NARODA INDUSTRIAL ESTATE BRANCH",

    terms:
        "1. Goods once sold will not be taken back or exchanged.\n" +
        "2. All disputes are subject to AHMEDABAD jurisdiction only.\n" +
        "3. Unloading need to arrange by customer if transport done by our side.\n" +
        "4. The Biocoal pellets are sold as it is, and the seller makes no warranties, express or implied.\n" +
        "5. Any claims regarding product quality must be reported within 48 hours of delivery."

};


/* =====================================================
   STATES
===================================================== */

const STATES = [
    "Jammu & Kashmir",
    "Himachal Pradesh",
    "Punjab",
    "Chandigarh",
    "Uttarakhand",
    "Haryana",
    "Delhi",
    "Rajasthan",
    "Uttar Pradesh",
    "Bihar",
    "Sikkim",
    "Arunachal Pradesh",
    "Nagaland",
    "Manipur",
    "Mizoram",
    "Tripura",
    "Meghalaya",
    "Assam",
    "West Bengal",
    "Jharkhand",
    "Odisha",
    "Chhattisgarh",
    "Madhya Pradesh",
    "Gujarat",
    "Maharashtra",
    "Andhra Pradesh",
    "Karnataka",
    "Goa",
    "Kerala",
    "Tamil Nadu",
    "Telangana",
    "Puducherry",
    "Ladakh",
    "Other Territory"
];


const STATE_CODES = {

    "Jammu & Kashmir": "01",
    "Himachal Pradesh": "02",
    "Punjab": "03",
    "Chandigarh": "04",
    "Uttarakhand": "05",
    "Haryana": "06",
    "Delhi": "07",
    "Rajasthan": "08",
    "Uttar Pradesh": "09",
    "Bihar": "10",
    "Sikkim": "11",
    "Arunachal Pradesh": "12",
    "Nagaland": "13",
    "Manipur": "14",
    "Mizoram": "15",
    "Tripura": "16",
    "Meghalaya": "17",
    "Assam": "18",
    "West Bengal": "19",
    "Jharkhand": "20",
    "Odisha": "21",
    "Chhattisgarh": "22",
    "Madhya Pradesh": "23",
    "Gujarat": "24",
    "Maharashtra": "27",
    "Andhra Pradesh": "37",
    "Karnataka": "29",
    "Goa": "30",
    "Kerala": "32",
    "Tamil Nadu": "33",
    "Telangana": "36",
    "Puducherry": "34",
    "Ladakh": "38"

};


/* =====================================================
   GLOBAL
===================================================== */

let invoices = loadInvoices();

let editingId = null;


/* =====================================================
   HELPERS
===================================================== */

const $ = id =>
    document.getElementById(id);


function val(id){

    return $(id)?.value || "";

}


function set(id, value){

    const element = $(id);

    if(element){

        element.value =
            value ?? "";

    }

}


function setText(id, value){

    const element = $(id);

    if(element){

        element.textContent =
            value ?? "";

    }

}


function money(number){

    return `₹${Number(
        number || 0
    ).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )}`;

}


function esc(value){

    return String(
        value ?? ""
    ).replace(
        /[&<>"']/g,
        char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char])
    );

}


/* =====================================================
   STORAGE
===================================================== */

function loadInvoices(){

    try{

        const data =
            localStorage.getItem(
                STORAGE
            );

        if(!data){
            return [];
        }

        const parsed =
            JSON.parse(data);

        return Array.isArray(parsed)
            ? parsed
            : [];

    }catch(error){

        console.error(
            "Invoice storage error:",
            error
        );

        return [];

    }

}


function saveAll(){

    try{

        localStorage.setItem(
            STORAGE,
            JSON.stringify(invoices)
        );

        return true;

    }catch(error){

        console.error(
            "Could not save invoices:",
            error
        );

        alert(
            "Invoice could not be saved in browser storage."
        );

        return false;

    }

}


function uid(){

    if(
        window.crypto &&
        crypto.randomUUID
    ){

        return crypto.randomUUID();

    }

    return (
        "inv-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(16)
            .slice(2)
    );

}


/* =====================================================
   DATE
===================================================== */

function localDate(
    date = new Date()
){

    const y =
        date.getFullYear();

    const m =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const d =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${y}-${m}-${d}`;

}


function today(){

    return localDate();

}


function addDays(
    dateString,
    days
){

    if(!dateString){
        return "";
    }

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    date.setDate(
        date.getDate() + days
    );

    return localDate(date);

}


function fmtDate(dateString){

    if(!dateString){
        return "-";
    }

    const parts =
        String(dateString).split("-");

    if(parts.length !== 3){
        return dateString;
    }

    return (
        parts[2] +
        "-" +
        parts[1] +
        "-" +
        parts[0]
    );

}


function formatDateTime(dateValue = new Date()){

    const date =
        dateValue instanceof Date
            ? dateValue
            : new Date(dateValue);

    if(Number.isNaN(date.getTime())){
        return "-";
    }

    const day =
        String(date.getDate()).padStart(2, "0");

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const year =
        date.getFullYear();

    let hours = date.getHours();
    const minutes =
        String(date.getMinutes()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${day}-${month}-${year} ${String(hours).padStart(2, "0")}:${minutes} ${period}`;

}


/* =====================================================
   STATE
===================================================== */

function stateCode(state){

    return STATE_CODES[state] || "";

}


/* =====================================================
   LOGIN
===================================================== */

function handleLogin(event){

    event.preventDefault();

    if(
        val("loginId") === LOGIN_ID &&
        val("loginPassword") === LOGIN_PASSWORD
    ){

        // Login is intentionally required again after a page refresh.
        // The credentials remain pre-filled, but the app does not auto-login.
        sessionStorage.setItem(
            "eco_logged_in",
            "1"
        );

        $("loginScreen")
            ?.classList
            .add("hidden");

        $("app")
            ?.classList
            .remove("hidden");

        initApp();

    }else{

        setText(
            "loginError",
            "Invalid Login ID or Password."
        );

    }

}


function requireLogin(){

    return sessionStorage.getItem(
        "eco_logged_in"
    ) === "1";

}


/* =====================================================
   INIT
===================================================== */

function initApp(){

    populateStates();

    bindNavigation();

    bindButtons();

    bindInputs();

    bindSmartSuggestions();

    setCompany();

    newInvoice();

    renderDashboard();

    renderHistory();

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        // Keep login fields blank on every fresh load.
        // Credentials are entered by the user and are never displayed automatically.
        set("loginId", "");
        set("loginPassword", "");

        $("loginForm")
            ?.addEventListener(
                "submit",
                handleLogin
            );

        // Require a fresh login after refresh, without exposing credentials.
        sessionStorage.removeItem("eco_logged_in");

    }
);


/* =====================================================
   STATES DROPDOWN
===================================================== */

function populateStates(){

    [
        "placeOfSupply",
        "sellerState",
        "customerState"
    ].forEach(id => {

        const select = $(id);

        if(!select){
            return;
        }

        select.innerHTML =
            `<option value="">
                Select State
            </option>` +
            STATES.map(
                state =>
                    `<option value="${esc(state)}">
                        ${esc(state)}
                    </option>`
            ).join("");

    });

}


/* =====================================================
   COMPANY
===================================================== */

function setCompany(){

    set(
        "sellerName",
        COMPANY.company
    );

    set(
        "sellerGSTIN",
        COMPANY.gstin
    );

    set(
        "sellerAddress",
        COMPANY.address
    );

    set(
        "sellerState",
        COMPANY.state
    );

    set(
        "sellerStateCode",
        stateCode(
            COMPANY.state
        )
    );

    set(
        "sellerPhone",
        COMPANY.phone
    );

    set(
        "sellerEmail",
        COMPANY.email
    );

    set(
        "bankDetails",
        COMPANY.bank
    );

    set(
        "terms",
        COMPANY.terms
    );

    set(
        "upiId",
        DEFAULT_UPI
    );

    set(
        "authorizedPerson",
        COMPANY.authorizedPerson
    );

    set(
        "designation",
        COMPANY.designation
    );

}


/* =====================================================
   NAVIGATION
===================================================== */

function bindNavigation(){

    document
        .querySelectorAll(
            ".nav-btn"
        )
        .forEach(button => {

            button.onclick =
                () => {

                    showSection(
                        button.dataset.section
                    );

                };

        });


    $("topNewInvoice")
        ?.addEventListener(
            "click",
            () => {

                newInvoice();

                showSection(
                    "create"
                );

            }
        );


    $("quickCreate")
        ?.addEventListener(
            "click",
            () => {

                newInvoice();

                showSection(
                    "create"
                );

            }
        );


    $("quickSettings")
        ?.addEventListener(
            "click",
            () => {

                showSection(
                    "settings"
                );

            }
        );


    $("viewHistory")
        ?.addEventListener(
            "click",
            () => {

                showSection(
                    "history"
                );

            }
        );


    $("backDashboard")
        ?.addEventListener(
            "click",
            () => {

                showSection(
                    "dashboard"
                );

            }
        );

}


function showSection(section){

    document
        .querySelectorAll(
            ".page-section"
        )
        .forEach(
            element =>
                element
                    .classList
                    .remove("active")
        );


    $(section)
        ?.classList
        .add("active");


    document
        .querySelectorAll(
            ".nav-btn"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === section
            );

        });


    const titles = {

        dashboard: [
            "Dashboard",
            "Manage your GST invoices"
        ],

        create: [
            "Create Tax Invoice",
            "Prepare a professional GST invoice"
        ],

        history: [
            "Invoice History",
            "Manage saved invoices"
        ],

        settings: [
            "Company Settings",
            "Permanent business information"
        ]

    };


    if(titles[section]){

        setText(
            "pageTitle",
            titles[section][0]
        );

        setText(
            "pageSubtitle",
            titles[section][1]
        );

    }

}


/* =====================================================
   BUTTONS
===================================================== */

function bindButtons(){

    $("addItem")
        ?.addEventListener(
            "click",
            addItem
        );


    $("saveInvoice")
        ?.addEventListener(
            "click",
            saveInvoice
        );


    $("printInvoice")
        ?.addEventListener(
            "click",
            printPDF
        );


    $("duplicateCurrent")
        ?.addEventListener(
            "click",
            duplicateCurrent
        );


    $("clearInvoice")
        ?.addEventListener(
            "click",
            () => {

                if(
                    confirm(
                        "Clear current invoice?"
                    )
                ){

                    newInvoice();

                }

            }
        );

}


/* =====================================================
   INPUT EVENTS
===================================================== */

function bindInputs(){

    $("invoiceDate")
        ?.addEventListener(
            "change",
            () => {

                set(
                    "dueDate",
                    addDays(
                        val("invoiceDate"),
                        7
                    )
                );

            }
        );


    [
        "customerState",
        "placeOfSupply"
    ].forEach(id => {

        $(id)
            ?.addEventListener(
                "change",
                () => {

                    set(
                        "customerStateCode",
                        stateCode(
                            val(
                                "customerState"
                            )
                        )
                    );

                    calculate();

                }
            );

    });


    $("itemsBody")
        ?.addEventListener(
            "input",
            calculate
        );


    $("itemsBody")
        ?.addEventListener(
            "change",
            event => {

                if(
                    event.target.classList
                        .contains("desc")
                ){

                    const row =
                        event.target
                            .closest("tr");

                    const hsn =
                        row?.querySelector(
                            ".hsn"
                        );

                    if(hsn){

                        // HSN/SAC belongs to the invoice sequence.
                        // Changing 1MM -> 5MM must keep the current invoice HSN.
                        hsn.value =
                            val("hsnSacNo") ||
                            DEFAULT_HSN;

                    }

                }

                calculate();

            }
        );


    $("itemsBody")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".remove-item"
                    );

                if(!button){
                    return;
                }

                button
                    .closest("tr")
                    ?.remove();

                if(
                    !document.querySelector(
                        "#itemsBody tr"
                    )
                ){

                    addItem();

                }

                renumber();

                calculate();

            }
        );

}


/* =====================================================
   INVOICE NUMBER
===================================================== */

function nextInvoiceNo(){

    const numbers =
        invoices.map(
            invoice =>
                parseInt(
                    String(
                        invoice.invoiceNumber || ""
                    ).replace(
                        /\D/g,
                        ""
                    ),
                    10
                ) || 0
        );


    return `INV-${String(
        Math.max(
            0,
            ...numbers
        ) + 1
    ).padStart(
        4,
        "0"
    )}`;

}


function nextEwayNo(){

    const numbers =
        invoices.map(
            invoice =>
                parseInt(
                    String(
                        invoice.ewayBillNo || ""
                    ).replace(
                        /\D/g,
                        ""
                    ),
                    10
                ) || 0
        );


    return String(
        Math.max(
            0,
            ...numbers
        ) + 1
    ).padStart(
        4,
        "0"
    );

}

/* =====================================================
   HSN / SAC SERIES
   Starts from 1910 and increases for each new invoice.
===================================================== */

function nextHSNSACNo(){

    const numbers =
        invoices.map(invoice => {

            const direct =
                String(
                    invoice.hsnSacNo || ""
                ).match(/^\d{4}/);

            if(direct){
                return Number(direct[0]) || 0;
            }

            const legacy =
                String(
                    invoice.items?.[0]?.hsn || ""
                ).match(/^\d{4}/);

            return legacy
                ? Number(legacy[0]) || 0
                : 0;

        });

    return String(
        Math.max(
            HSN_START - 1,
            ...numbers
        ) + 1
    );

}


function getInvoiceHSNSAC(invoice){

    const direct =
        String(
            invoice?.hsnSacNo || ""
        ).match(/^\d{4}/);

    if(direct){
        return direct[0];
    }

    const legacy =
        String(
            invoice?.items?.[0]?.hsn || ""
        ).match(/^\d{4}/);

    return legacy
        ? legacy[0]
        : "";

}


/* =====================================================
   SMART CUSTOMER / VEHICLE SUGGESTIONS
===================================================== */

function uniqueValues(values){

    return [...new Set(
        values
            .map(value => String(value || "").trim())
            .filter(Boolean)
    )];

}

function refreshSuggestions(){

    const customerList = $("customerSuggestions");
    const vehicleList = $("vehicleSuggestions");

    if(customerList){

        const customers = uniqueValues(
            invoices.map(invoice => invoice.customer?.name)
        );

        customerList.innerHTML = customers
            .map(name => `<option value="${esc(name)}"></option>`)
            .join("");

    }

    if(vehicleList){

        const vehicles = uniqueValues(
            invoices.map(invoice => invoice.vehicleNo)
        );

        vehicleList.innerHTML = vehicles
            .map(vehicle => `<option value="${esc(vehicle)}"></option>`)
            .join("");

    }

}

function findLatestCustomer(name){

    const target = String(name || "").trim().toLowerCase();

    return invoices.find(invoice =>
        String(invoice.customer?.name || "").trim().toLowerCase() === target
    );

}

function applyCustomerSuggestion(){

    const invoice = findLatestCustomer(val("customerName"));

    if(!invoice){
        return;
    }

    const customer = invoice.customer || {};

    set("customerGSTIN", customer.gstin);
    set("customerAddress", customer.address);
    set("customerState", customer.state);
    set("customerStateCode", customer.stateCode || stateCode(customer.state));
    set("customerPhone", customer.phone);
    set("customerEmail", customer.email);
    set("placeOfSupply", invoice.placeOfSupply || customer.state || "Gujarat");
    set("vehicleNo", invoice.vehicleNo);

    calculate();

}

function bindSmartSuggestions(){

    $("customerName")?.addEventListener("change", applyCustomerSuggestion);
    $("customerName")?.addEventListener("blur", applyCustomerSuggestion);

    $("vehicleNo")?.addEventListener("change", () => {
        const value = val("vehicleNo").trim().toLowerCase();
        const match = invoices.find(invoice =>
            String(invoice.vehicleNo || "").trim().toLowerCase() === value
        );

        if(match?.customer?.name && !val("customerName")){
            set("customerName", match.customer.name);
            applyCustomerSuggestion();
        }
    });

    refreshSuggestions();

}


/* =====================================================
   NEW INVOICE
===================================================== */

function newInvoice(){

    editingId = null;

    $("invoiceForm")
        ?.reset();

    setCompany();

    const date =
        today();


    set(
        "invoiceNumber",
        nextInvoiceNo()
    );

    set(
        "invoiceDate",
        date
    );

    set(
        "dueDate",
        addDays(
            date,
            7
        )
    );

    set(
        "ewayBillNo",
        nextEwayNo()
    );

    set(
        "hsnSacNo",
        nextHSNSACNo()
    );

    setText(
        "itemsHint",
        `Pine Wood Pellets • HSN/SAC ${val("hsnSacNo")} • Quantity in KGS`
    );

    set(
        "placeOfSupply",
        "Gujarat"
    );

    set(
        "paymentStatus",
        "Unpaid"
    );


    const body =
        $("itemsBody");

    if(body){

        body.innerHTML = "";

        addItem();

    }

    refreshSuggestions();
    calculate();

}


/* =====================================================
   ADD ITEM
===================================================== */

function addItem(data = {}){

    const body =
        $("itemsBody");

    if(!body){
        return;
    }


    const row =
        document.createElement("tr");


    const selected =
        PRODUCT_OPTIONS.includes(
            data.description
        )
            ? data.description
            : PRODUCT_OPTIONS[0];

    const rowHSN =
        data.hsn ||
        val("hsnSacNo") ||
        DEFAULT_HSN;


    row.innerHTML = `

        <td class="rowno"></td>

        <td>

            <select class="desc">

                ${PRODUCT_OPTIONS.map(
                    product =>
                        `<option
                            value="${esc(product)}"
                            ${
                                product === selected
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${esc(product)}
                        </option>`
                ).join("")}

            </select>

        </td>


        <td>

            <input
                class="hsn"
                value="${esc(rowHSN)}"
                readonly
            >

        </td>


        <td>

            <input
                class="qty"
                type="number"
                min="0"
                step="0.001"
                value="${data.qty ?? 1}"
            >

        </td>


        <td>

            <input
                class="rate"
                type="number"
                min="0"
                step="0.01"
                value="${data.rate ?? 0}"
            >

        </td>


        <td>

            <input
                class="disc"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value="${data.discount ?? 0}"
            >

        </td>


        <td>

            <input
                class="gst"
                type="number"
                min="0"
                step="0.01"
                value="${data.gst ?? 5}"
            >

        </td>


        <td>

            <input
                class="cess"
                type="number"
                min="0"
                step="0.01"
                value="${data.cess ?? 0}"
            >

        </td>


        <td class="taxable-cell">
            ₹0.00
        </td>


        <td>

            <button
                type="button"
                class="remove-item"
            >
                ✕
            </button>

        </td>

    `;


    body.appendChild(row);

    renumber();

    calculate();

}


/* =====================================================
   RENUMBER
===================================================== */

function renumber(){

    document
        .querySelectorAll(
            "#itemsBody tr"
        )
        .forEach(
            (row, index) => {

                const number =
                    row.querySelector(
                        ".rowno"
                    );

                if(number){

                    number.textContent =
                        index + 1;

                }

            }
        );

}


/* =====================================================
   GST
===================================================== */

function sameState(){

    const supply =
        val("placeOfSupply") ||
        val("customerState");

    return supply ===
        COMPANY.state;

}


/* =====================================================
   CALCULATE
===================================================== */

function calculate(){

    let subtotal = 0;
    let discount = 0;
    let taxable = 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    let cess = 0;


    document
        .querySelectorAll(
            "#itemsBody tr"
        )
        .forEach(row => {

            const qty =
                Number(
                    row.querySelector(
                        ".qty"
                    )?.value
                ) || 0;


            const rate =
                Number(
                    row.querySelector(
                        ".rate"
                    )?.value
                ) || 0;


            const disc =
                Number(
                    row.querySelector(
                        ".disc"
                    )?.value
                ) || 0;


            const gst =
                Number(
                    row.querySelector(
                        ".gst"
                    )?.value
                ) || 0;


            const cessRate =
                Number(
                    row.querySelector(
                        ".cess"
                    )?.value
                ) || 0;


            const sub =
                qty * rate;


            const discountAmount =
                sub * disc / 100;


            const taxableAmount =
                sub -
                discountAmount;


            const gstAmount =
                taxableAmount *
                gst /
                100;


            const cessAmount =
                taxableAmount *
                cessRate /
                100;


            subtotal += sub;

            discount +=
                discountAmount;

            taxable +=
                taxableAmount;

            cess +=
                cessAmount;


            if(sameState()){

                cgst +=
                    gstAmount / 2;

                sgst +=
                    gstAmount / 2;

            }else{

                igst +=
                    gstAmount;

            }


            const cell =
                row.querySelector(
                    ".taxable-cell"
                );

            if(cell){

                cell.textContent =
                    money(
                        taxableAmount
                    );

            }

        });


    const total =
        taxable +
        cgst +
        sgst +
        igst +
        cess;


    setText(
        "summarySubtotal",
        money(subtotal)
    );

    setText(
        "summaryDiscount",
        money(discount)
    );

    setText(
        "summaryTaxable",
        money(taxable)
    );

    setText(
        "summaryCGST",
        money(cgst)
    );

    setText(
        "summarySGST",
        money(sgst)
    );

    setText(
        "summaryIGST",
        money(igst)
    );

    setText(
        "summaryCess",
        money(cess)
    );

    setText(
        "summaryTotal",
        money(total)
    );

    setText(
        "amountWords",
        numberToWords(total)
    );


    return {
        subtotal,
        discount,
        taxable,
        cgst,
        sgst,
        igst,
        cess,
        total
    };

}


/* =====================================================
   COLLECT FORM DATA
===================================================== */

function collect(){

    const totals =
        calculate();


    return {

        id:
            editingId ||
            uid(),

        invoiceNumber:
            val("invoiceNumber"),

        invoiceDate:
            val("invoiceDate"),

        dueDate:
            val("dueDate"),

        ewayBillNo:
            val("ewayBillNo"),

        hsnSacNo:
            val("hsnSacNo") ||
            DEFAULT_HSN,

        generatedAt:
            (editingId && invoices.find(item => item.id === editingId)?.generatedAt) ||
            new Date().toISOString(),

        vehicleNo:
            val("vehicleNo"),

        placeOfSupply:
            val("placeOfSupply"),

        reverseCharge:
            val("reverseCharge"),

        customer: {

            name:
                val("customerName"),

            gstin:
                val("customerGSTIN"),

            address:
                val("customerAddress"),

            state:
                val("customerState"),

            stateCode:
                val("customerStateCode"),

            phone:
                val("customerPhone"),

            email:
                val("customerEmail")

        },


        items:
            [
                ...document.querySelectorAll(
                    "#itemsBody tr"
                )
            ].map(row => ({

                description:
                    row.querySelector(
                        ".desc"
                    )?.value || "",

                hsn:
                    row.querySelector(
                        ".hsn"
                    )?.value ||
                    val("hsnSacNo") ||
                    DEFAULT_HSN,

                qty:
                    Number(
                        row.querySelector(
                            ".qty"
                        )?.value
                    ) || 0,

                rate:
                    Number(
                        row.querySelector(
                            ".rate"
                        )?.value
                    ) || 0,

                discount:
                    Number(
                        row.querySelector(
                            ".disc"
                        )?.value
                    ) || 0,

                gst:
                    Number(
                        row.querySelector(
                            ".gst"
                        )?.value
                    ) || 0,

                cess:
                    Number(
                        row.querySelector(
                            ".cess"
                        )?.value
                    ) || 0

            })),


        paymentStatus:
            val("paymentStatus"),

        notes:
            val("notes"),

        totals,

        createdAt:
            Date.now()

    };

}


/* =====================================================
   VALIDATE
===================================================== */

function validate(invoice){

    if(
        !invoice.invoiceNumber ||
        !invoice.invoiceDate
    ){

        alert(
            "Invoice number and date are required."
        );

        return false;

    }


    if(!invoice.dueDate){

        alert(
            "Due Date is required."
        );

        return false;

    }


    if(!invoice.customer.name){

        alert(
            "Customer Name is required."
        );

        return false;

    }


    if(!invoice.items.length){

        alert(
            "Add at least one item."
        );

        return false;

    }


    return true;

}


/* =====================================================
   UPSERT INVOICE
   IMPORTANT AUTO SAVE FUNCTION
===================================================== */

function upsertInvoice(invoice){

    const index =
        invoices.findIndex(
            item =>
                item.id ===
                invoice.id
        );


    if(index >= 0){

        invoices[index] =
            invoice;

    }else{

        invoices.unshift(
            invoice
        );

    }


    const saved =
        saveAll();


    if(saved){

        editingId =
            invoice.id;

        renderDashboard();

        renderHistory();

        refreshSuggestions();

    }


    return saved;

}


/* =====================================================
   SAVE INVOICE
===================================================== */

function saveInvoice(){

    if(!requireLogin()){

        alert(
            "Please login first."
        );

        return false;

    }


    const invoice =
        collect();


    if(!validate(invoice)){

        return false;

    }


    const saved =
        upsertInvoice(
            invoice
        );


    if(saved){

        alert(
            "Invoice saved successfully."
        );

    }


    return saved;

}


/* =====================================================
   PRINT / SAVE PDF
   AUTO SAVE BEFORE PRINT
===================================================== */

function printPDF(){

    if(!requireLogin()){

        alert(
            "Please login first."
        );

        return;

    }


    /*
       FIRST COLLECT CURRENT FORM
    */

    const invoice =
        collect();


    /*
       VALIDATE BEFORE PRINT
    */

    if(!validate(invoice)){

        return;

    }


    /*
       IMPORTANT:
       SAVE INVOICE BEFORE WINDOW.PRINT()
    */

    const saved =
        upsertInvoice(
            invoice
        );


    if(!saved){

        alert(
            "Invoice could not be saved. PDF/Print cancelled."
        );

        return;

    }


    /*
       PUT DATA INTO PRINT TEMPLATE
    */

    populatePrint(
        invoice
    );


    /*
       WAIT FOR DOM TO FINISH
       THEN OPEN PRINT DIALOG
    */

    setTimeout(
        () => {

            window.print();

        },
        300
    );

}


/* =====================================================
   PRINT DATA
===================================================== */

function populatePrint(invoice){

    const t =
        invoice.totals;


    setText(
        "pSellerName",
        COMPANY.company
    );

    setText(
        "pSellerAddress",
        COMPANY.address
    );

    setText(
        "pSellerGSTIN",
        COMPANY.gstin
    );

    setText(
        "pSellerContact",
        `${COMPANY.phone} • ${COMPANY.email}`
    );


    setText(
        "pInvoiceNumber",
        invoice.invoiceNumber
    );

    setText(
        "pInvoiceDate",
        fmtDate(
            invoice.invoiceDate
        )
    );

    setText(
        "pGeneratedAt",
        formatDateTime(
            invoice.generatedAt || new Date()
        )
    );

    setText(
        "pDueDate",
        fmtDate(
            invoice.dueDate
        )
    );

    setText(
        "pEway",
        invoice.ewayBillNo || "-"
    );

    setText(
        "pVehicle",
        invoice.vehicleNo || "-"
    );

    setText(
        "pSupply",
        invoice.placeOfSupply ||
        invoice.customer.state ||
        "-"
    );

    setText(
        "pReverse",
        invoice.reverseCharge ||
        "No"
    );


    setText(
        "pFromName",
        COMPANY.company
    );

    setText(
        "pFromAddress",
        COMPANY.address
    );

    setText(
        "pFromGSTIN",
        COMPANY.gstin
    );

    setText(
        "pFromState",
        `${COMPANY.state} (${stateCode(
            COMPANY.state
        )})`
    );


    setText(
        "pCustomerName",
        invoice.customer.name
    );

    setText(
        "pCustomerAddress",
        invoice.customer.address ||
        "-"
    );

    setText(
        "pCustomerGSTIN",
        invoice.customer.gstin ||
        "-"
    );

    setText(
        "pCustomerState",
        invoice.customer.state
            ? `${invoice.customer.state} (${invoice.customer.stateCode})`
            : "-"
    );


    const body =
        $("pItems");


    if(body){

        body.innerHTML = "";


        invoice.items.forEach(
            (item, index) => {

                const subtotal =
                    Number(item.qty) *
                    Number(item.rate);


                const discount =
                    subtotal *
                    Number(item.discount || 0) /
                    100;


                const taxable =
                    subtotal -
                    discount;


                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${esc(
                            item.description
                        )}
                    </td>

                    <td>
                        ${esc(
                            item.hsn ||
                            invoice.hsnSacNo ||
                            DEFAULT_HSN
                        )}
                    </td>

                    <td>
                        ${Number(
                            item.qty || 0
                        ).toFixed(3)}
                    </td>

                    <td>
                        ${money(
                            item.rate
                        )}
                    </td>

                    <td>
                        ${Number(
                            item.discount || 0
                        )}%
                    </td>

                    <td>
                        ${Number(
                            item.gst || 0
                        )}%
                    </td>

                    <td>
                        ${money(
                            taxable
                        )}
                    </td>

                `;


                body.appendChild(
                    row
                );

            }
        );

    }


    setText(
        "pBank",
        COMPANY.bank
    );

    setText(
        "pUPI",
        DEFAULT_UPI
    );

    setText(
        "pPayment",
        invoice.paymentStatus ||
        "Unpaid"
    );

    setText(
        "pTerms",
        COMPANY.terms
    );


    setText(
        "pSubtotal",
        money(
            t.subtotal
        )
    );

    setText(
        "pDiscount",
        money(
            t.discount
        )
    );

    setText(
        "pTaxable",
        money(
            t.taxable
        )
    );

    setText(
        "pCGST",
        money(
            t.cgst
        )
    );

    setText(
        "pSGST",
        money(
            t.sgst
        )
    );

    setText(
        "pIGST",
        money(
            t.igst
        )
    );

    setText(
        "pCess",
        money(
            t.cess
        )
    );

    setText(
        "pTotal",
        money(
            t.total
        )
    );

    setText(
        "pWords",
        numberToWords(
            t.total
        )
    );

}


/* =====================================================
   EDIT INVOICE
===================================================== */

function editInvoice(id){

    const invoice =
        invoices.find(
            item =>
                item.id === id
        );


    if(!invoice){

        return;

    }


    editingId =
        id;


    setForm(
        invoice
    );


    showSection(
        "create"
    );

}


/* =====================================================
   SET FORM
===================================================== */

function setForm(invoice){

    set(
        "invoiceNumber",
        invoice.invoiceNumber
    );

    set(
        "invoiceDate",
        invoice.invoiceDate
    );

    set(
        "dueDate",
        invoice.dueDate ||
        addDays(
            invoice.invoiceDate,
            7
        )
    );

    set(
        "ewayBillNo",
        invoice.ewayBillNo
    );

    set(
        "hsnSacNo",
        getInvoiceHSNSAC(invoice) ||
        DEFAULT_HSN
    );

    setText(
        "itemsHint",
        `Pine Wood Pellets • HSN/SAC ${val("hsnSacNo")} • Quantity in KGS`
    );

    set(
        "vehicleNo",
        invoice.vehicleNo
    );

    set(
        "placeOfSupply",
        invoice.placeOfSupply
    );

    set(
        "reverseCharge",
        invoice.reverseCharge ||
        "No"
    );


    set(
        "customerName",
        invoice.customer?.name
    );

    set(
        "customerGSTIN",
        invoice.customer?.gstin
    );

    set(
        "customerAddress",
        invoice.customer?.address
    );

    set(
        "customerState",
        invoice.customer?.state
    );

    set(
        "customerStateCode",
        invoice.customer?.stateCode
    );

    set(
        "customerPhone",
        invoice.customer?.phone
    );

    set(
        "customerEmail",
        invoice.customer?.email
    );


    set(
        "paymentStatus",
        invoice.paymentStatus ||
        "Unpaid"
    );

    set(
        "notes",
        invoice.notes
    );


    setCompany();


    const body =
        $("itemsBody");

    if(body){

        body.innerHTML = "";

        (
            invoice.items ||
            []
        ).forEach(
            item =>
                addItem(item)
        );

    }


    calculate();

}


/* =====================================================
   DELETE
===================================================== */

function deleteInvoice(id){

    if(
        !confirm(
            "Delete this invoice?"
        )
    ){

        return;

    }


    invoices =
        invoices.filter(
            invoice =>
                invoice.id !== id
        );


    saveAll();

    renderDashboard();

    renderHistory();

}


/* =====================================================
   DUPLICATE SAVED INVOICE
===================================================== */

function duplicateInvoice(id){

    const invoice =
        invoices.find(
            item =>
                item.id === id
        );


    if(!invoice){

        return;

    }


    const copy =
        JSON.parse(
            JSON.stringify(
                invoice
            )
        );


    copy.id =
        uid();

    copy.invoiceNumber =
        nextInvoiceNo();

    copy.invoiceDate =
        today();

    copy.dueDate =
        addDays(
            copy.invoiceDate,
            7
        );

    copy.ewayBillNo =
        nextEwayNo();

    copy.hsnSacNo =
        String(
            Math.max(
                Number(getInvoiceHSNSAC(invoice)) || HSN_START - 1,
                Number(nextHSNSACNo()) - 1
            ) + 1
        );

    copy.items =
        (copy.items || []).map(item => ({
            ...item,
            hsn: copy.hsnSacNo
        }));

    copy.createdAt =
        Date.now();


    invoices.unshift(
        copy
    );


    saveAll();

    renderDashboard();

    renderHistory();

    editInvoice(
        copy.id
    );

}


/* =====================================================
   DUPLICATE CURRENT
===================================================== */

function duplicateCurrent(){

    const invoice =
        collect();


    invoice.id =
        uid();

    invoice.invoiceNumber =
        nextInvoiceNo();

    invoice.invoiceDate =
        today();

    invoice.dueDate =
        addDays(
            invoice.invoiceDate,
            7
        );

    invoice.ewayBillNo =
        nextEwayNo();

    invoice.hsnSacNo =
        String(
            Math.max(
                Number(getInvoiceHSNSAC(invoice)) || HSN_START - 1,
                Number(nextHSNSACNo()) - 1
            ) + 1
        );

    invoice.items =
        (invoice.items || []).map(item => ({
            ...item,
            hsn: invoice.hsnSacNo
        }));


    editingId =
        null;


    setForm(
        invoice
    );


    showSection(
        "create"
    );

}


/* =====================================================
   DASHBOARD
===================================================== */

function renderDashboard(){

    const total =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.totals?.total ||
                    0
                ),
            0
        );


    const gst =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.totals?.cgst ||
                    0
                ) +
                Number(
                    invoice.totals?.sgst ||
                    0
                ) +
                Number(
                    invoice.totals?.igst ||
                    0
                ) +
                Number(
                    invoice.totals?.cess ||
                    0
                ),
            0
        );


    const month =
        today().slice(
            0,
            7
        );


    const monthTotal =
        invoices
            .filter(
                invoice =>
                    String(
                        invoice.invoiceDate ||
                        ""
                    ).startsWith(
                        month
                    )
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(
                        invoice.totals?.total ||
                        0
                    ),
                0
            );


    setText(
        "statInvoices",
        invoices.length
    );

    setText(
        "statSales",
        money(total)
    );

    setText(
        "statGST",
        money(gst)
    );

    setText(
        "statMonth",
        money(monthTotal)
    );


    const recent =
        $("recentInvoices");


    if(!recent){

        return;

    }


    if(!invoices.length){

        recent.innerHTML = `

            <div class="empty">

                🧾

                <b>
                    No invoices yet
                </b>

                Create your first invoice.

            </div>

        `;

        return;

    }


    recent.innerHTML =
        invoices
            .slice(
                0,
                5
            )
            .map(
                invoice => `

                    <div class="history-row">

                        <div>

                            <b>
                                ${esc(
                                    invoice.invoiceNumber
                                )}
                            </b>

                            <small>
                                ${esc(
                                    invoice.customer?.name ||
                                    ""
                                )}

                                •

                                ${fmtDate(
                                    invoice.invoiceDate
                                )}
                            </small>

                        </div>


                        <strong>
                            ${money(
                                invoice.totals?.total
                            )}
                        </strong>


                        <span>
                            ${esc(
                                invoice.paymentStatus ||
                                ""
                            )}
                        </span>


                        <div class="history-actions">

                            <button
                                type="button"
                                class="secondary-btn"
                                onclick="editInvoice('${invoice.id}')"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="danger-btn"
                                onclick="deleteInvoice('${invoice.id}')"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =====================================================
   HISTORY
===================================================== */

function renderHistory(){

    const history =
        $("historyList");


    if(!history){

        return;

    }


    if(!invoices.length){

        history.innerHTML = `

            <div class="empty">

                No saved invoices.

            </div>

        `;

        return;

    }


    history.innerHTML =
        invoices
            .map(
                invoice => `

                    <div class="history-row">

                        <div>

                            <b>
                                ${esc(
                                    invoice.invoiceNumber
                                )}
                            </b>

                            <small>
                                ${esc(
                                    invoice.customer?.name ||
                                    ""
                                )}

                                •

                                ${fmtDate(
                                    invoice.invoiceDate
                                )}
                            </small>

                        </div>


                        <strong>
                            ${money(
                                invoice.totals?.total
                            )}
                        </strong>


                        <span>
                            ${esc(
                                invoice.paymentStatus ||
                                ""
                            )}
                        </span>


                        <div class="history-actions">

                            <button
                                type="button"
                                class="secondary-btn"
                                onclick="editInvoice('${invoice.id}')"
                            >
                                Edit
                            </button>


                            <button
                                type="button"
                                class="secondary-btn"
                                onclick="duplicateInvoice('${invoice.id}')"
                            >
                                Duplicate
                            </button>


                            <button
                                type="button"
                                class="danger-btn"
                                onclick="deleteInvoice('${invoice.id}')"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =====================================================
   INDIAN NUMBER TO WORDS
===================================================== */

const ones = [

    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen"

];


const tens = [

    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety"

];


function two(n){

    n =
        Math.floor(n);


    if(n < 20){

        return ones[n];

    }


    return (
        tens[
            Math.floor(
                n / 10
            )
        ] +
        (
            n % 10
                ? " " +
                  ones[
                      n % 10
                  ]
                : ""
        )
    );

}


function twoOrHundred(n){

    n =
        Math.floor(n);


    if(n < 100){

        return two(n);

    }


    return (
        ones[
            Math.floor(
                n / 100
            )
        ] +
        " Hundred" +
        (
            n % 100
                ? " " +
                  two(
                      n % 100
                  )
                : ""
        )
    );

}


function indian(n){

    n =
        Math.floor(n);


    if(n === 0){

        return "Zero";

    }


    let out = "";


    const crore =
        Math.floor(
            n / 10000000
        );

    n %= 10000000;


    const lakh =
        Math.floor(
            n / 100000
        );

    n %= 100000;


    const thousand =
        Math.floor(
            n / 1000
        );

    n %= 1000;


    const hundred =
        Math.floor(
            n / 100
        );

    n %= 100;


    if(crore){

        out +=
            twoOrHundred(
                crore
            ) +
            " Crore ";

    }


    if(lakh){

        out +=
            twoOrHundred(
                lakh
            ) +
            " Lakh ";

    }


    if(thousand){

        out +=
            twoOrHundred(
                thousand
            ) +
            " Thousand ";

    }


    if(hundred){

        out +=
            ones[hundred] +
            " Hundred ";

    }


    if(n){

        out +=
            (
                out
                    ? "and "
                    : ""
            ) +
            two(n);

    }


    return out.trim();

}


function numberToWords(amount){

    amount =
        Math.round(
            Number(
                amount || 0
            ) * 100
        ) / 100;


    const rupees =
        Math.floor(amount);


    const paise =
        Math.round(
            (
                amount -
                rupees
            ) * 100
        );


    return (
        `Rupees ${indian(
            rupees
        )}` +
        (
            paise
                ? ` and ${two(
                    paise
                )} Paise`
                : ""
        ) +
        " Only"
    );

}


/* =====================================================
   EXTRA SAFETY:
   AUTO SAVE WHEN PRINTING FROM BROWSER
===================================================== */

window.addEventListener(
    "beforeprint",
    () => {

        if(
            !requireLogin()
        ){

            return;

        }


        try{

            const invoice =
                collect();


            if(
                validate(invoice)
            ){

                upsertInvoice(
                    invoice
                );

            }

        }catch(error){

            console.error(
                "Auto-save before print failed:",
                error
            );

        }

    }
);


/* =====================================================
   AFTER PRINT
===================================================== */

window.addEventListener(
    "afterprint",
    () => {

        renderDashboard();

        renderHistory();

    }
);