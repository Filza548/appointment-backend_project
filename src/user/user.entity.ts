import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneNumber: number;          

    @Column()
    email: string;  

    @Column()
    Date: number;  

    @Column()
    Time: number;  

}