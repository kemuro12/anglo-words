
let initialState = {
    links: [
        { title: "Главная", path: "/", icon: null, authShield: false },
        { title: "Библиотека", path: "/library", icon: "library_books", authShield: false },
        { title: "Мои словари", path: "/vocabulary", icon: "book", authShield: true },
        { title: "Тренироваться", path: "/games", icon: "sports_esports", authShield: true }
    ]
}

const headerReducer = (state = initialState, action) => {
    switch(action.type){
        
        default:
            return state; 
    }
}



export default headerReducer;