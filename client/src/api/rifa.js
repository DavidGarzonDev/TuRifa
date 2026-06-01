import api from "../utils/api";

export const getRifas = (token) => 
    api.post("/create/rifa", {token} );
export const createRifa = (rifa) => 
    api.post("/create/rifa", rifa);
export const getAllRifas = () => 
    api.get("/get/all/rifas");
export const getRifaById = (rifaId) => 
    api.get("/get/rifa", {params : {rifaId}});
export const updatePartialRifa = (id, fieldsToUpdate) => 
    api.patch("/update/rifa", fieldsToUpdate, {params : {id}});
export const decrementRifaTicket = (rifaId, amount) => 
    api.patch("/decrement/ticket", {rifaId, amount});
export const checkRifaForDraw = (rifaId, token) => 
    api.post(`/rifas/${rifaId}/check-draw`, { token });
export const realizarSorteo = (rifaId, token) => 
    api.post(`/rifas/${rifaId}/sorteo`, { token });
