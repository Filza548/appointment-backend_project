import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('web_development_projects')
export class WebDevelopmentProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  clientName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: ['landing_page', 'ecommerce', 'portfolio', 'web_app', 'cms', 'api_integration'] })
  projectType: string;

  @Column({ type: 'enum', enum: ['react', 'nextjs', 'vue', 'angular', 'html_css', 'nodejs', 'fullstack'] })
  techStack: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  repositoryUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  liveUrl: string;

  @Column({ type: 'boolean', default: false })
  isResponsive: boolean;

  @Column({ type: 'boolean', default: false })
  seoOptimized: boolean;

  @Column({ type: 'enum', enum: ['planning', 'in_progress', 'review', 'completed', 'cancelled'], default: 'planning' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  projectBudget: number;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}