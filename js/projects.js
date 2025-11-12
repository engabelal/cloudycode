// Projects Data
const allProjects = [
  { 
    icon: 'fab fa-docker', 
    title: 'ECS Fargate Blue/Green Deployment', 
    desc: 'Production-ready containerized deployment using AWS ECS Fargate with automated Blue/Green strategy via CodeDeploy, zero-downtime updates, and GitHub Actions CI/CD.', 
    link: 'https://github.com/engabelal/ecs-fargate-terraform-deployment', 
    category: 'cicd',
    problem: 'Container deployments causing downtime and lacking automated rollback capabilities',
    solution: 'Blue/Green deployment with CodeDeploy, modular Terraform (9 modules), GitHub Actions OIDC, and automated rollback on failure',
    techStack: ['ECS Fargate', 'CodeDeploy', 'Terraform', 'GitHub Actions', 'ALB', 'ECR', 'DynamoDB'],
    results: ['Zero downtime deployments', 'Automatic rollback', 'Serverless containers', '9 reusable Terraform modules']
  },
  { 
    icon: 'fab fa-docker', 
    title: 'ECS Fargate Blue/Green Deployment', 
    desc: 'Production-ready containerized deployment using AWS ECS Fargate with automated Blue/Green strategy via CodeDeploy, zero-downtime updates, and GitHub Actions CI/CD.', 
    link: 'https://github.com/engabelal/ecs-fargate-terraform-deployment', 
    category: 'infrastructure',
    problem: 'Container deployments causing downtime and lacking automated rollback capabilities',
    solution: 'Blue/Green deployment with CodeDeploy, modular Terraform (9 modules), GitHub Actions OIDC, and automated rollback on failure',
    techStack: ['ECS Fargate', 'CodeDeploy', 'Terraform', 'GitHub Actions', 'ALB', 'ECR', 'DynamoDB'],
    results: ['Zero downtime deployments', 'Automatic rollback', 'Serverless containers', '9 reusable Terraform modules']
  },
  { 
    icon: 'fab fa-node-js', 
    title: 'Node.js CI/CD Pipeline', 
    desc: 'GitHub Actions and Terraform pipeline delivering sub-15-second deployments, automated testing, and zero-downtime releases on AWS EC2.', 
    link: 'https://github.com/engabelal/simple-nodejs-ec2-cicd', 
    category: 'cicd',
    problem: 'Manual deployments causing delays and inconsistencies across environments',
    solution: 'Automated CI/CD pipeline with GitHub Actions, Terraform IaC, and blue-green deployment strategy',
    techStack: ['GitHub Actions', 'Terraform', 'AWS EC2', 'Docker', 'Nginx'],
    results: ['85% faster deployment', 'Zero downtime releases', '100% environment consistency']
  },
  { 
    icon: 'fab fa-aws', 
    title: 'AWS Serverless Event Platform', 
    desc: 'EventBridge, Lambda, and DynamoDB stack codified as IaC—with CloudFront acceleration and automated environment provisioning.', 
    link: 'https://github.com/engabelal/iac-aws-serverless-event', 
    category: 'serverless',
    problem: 'High infrastructure costs and maintenance overhead for event-driven applications',
    solution: 'Serverless architecture using EventBridge for event routing, Lambda for processing, and DynamoDB for storage',
    techStack: ['AWS Lambda', 'EventBridge', 'DynamoDB', 'CloudFront', 'API Gateway'],
    results: ['60% cost reduction', 'Auto-scaling to zero', '99.99% availability']
  },
  { 
    icon: 'fas fa-server', 
    title: 'Auto-Scaling Web Infrastructure', 
    desc: 'Terraform-built AWS blueprint combining EC2 Auto Scaling, Network Load Balancers, and multi-AZ failover for resilient web tiers.', 
    link: 'https://github.com/engabelal/simple-webapp-ec2-nlb-asg', 
    category: 'infrastructure',
    problem: 'Web application unable to handle traffic spikes and single point of failure',
    solution: 'Multi-AZ architecture with auto-scaling groups, network load balancers, and health checks',
    techStack: ['Terraform', 'AWS EC2', 'Auto Scaling', 'NLB', 'CloudWatch'],
    results: ['5x traffic capacity', '99.9% uptime', 'Automatic failover']
  },
  { 
    icon: 'fas fa-cogs', 
    title: 'MERN Stack Automation', 
    desc: 'Idempotent Ansible playbooks provisioning MongoDB, Express, React, and Node with hardened configurations and repeatable rollouts.', 
    link: 'https://github.com/engabelal/cm-ansible-mern-stack', 
    category: 'automation',
    problem: 'Inconsistent MERN stack deployments and configuration drift across servers',
    solution: 'Idempotent Ansible playbooks with role-based configuration and automated security hardening',
    techStack: ['Ansible', 'MongoDB', 'Express.js', 'React', 'Node.js'],
    results: ['90% faster provisioning', 'Zero configuration drift', 'Repeatable deployments']
  },
  { 
    icon: 'fas fa-box', 
    title: 'Hardened DevOps AMI', 
    desc: 'Packer pipeline producing CIS-aligned Ubuntu AMIs preloaded with DevOps tooling, CloudWatch telemetry, and guardrails.', 
    link: 'https://github.com/engabelal/packer-aws-devops-ami', 
    category: 'infrastructure',
    problem: 'Security vulnerabilities and slow instance launch times due to runtime installations',
    solution: 'Pre-baked AMIs with CIS benchmarks, DevOps tools, and monitoring agents using Packer',
    techStack: ['Packer', 'AWS AMI', 'Ubuntu', 'CloudWatch', 'CIS Benchmarks'],
    results: ['70% faster boot time', 'CIS Level 1 compliant', 'Standardized tooling']
  },
  { 
    icon: 'fas fa-layer-group', 
    title: 'Terraform Layered MERN with RDS', 
    desc: 'Multi-tier Terraform architecture deploying MERN stack with RDS MySQL, VPC isolation, and production-grade networking.', 
    link: 'https://github.com/engabelal/terraform-layered-mern-rds', 
    category: 'infrastructure',
    problem: 'Complex multi-tier application requiring secure network isolation and managed database',
    solution: 'Layered Terraform modules with VPC isolation, private subnets, and RDS MySQL with automated backups',
    techStack: ['Terraform', 'AWS VPC', 'RDS MySQL', 'EC2', 'Security Groups'],
    results: ['Network isolation', 'Automated backups', 'Modular IaC design']
  },
  { 
    icon: 'fas fa-terminal', 
    title: 'CloudOps Scripts Kit', 
    desc: 'Production-ready shell toolkit for AWS auditing, cost optimisation, and day-two operations automation.', 
    link: 'https://github.com/engabelal/abcloudops-scripts-kit', 
    category: 'automation',
    problem: 'Manual AWS operations consuming time and prone to human errors',
    solution: 'Automated shell scripts for common AWS operations, cost analysis, and security auditing',
    techStack: ['Bash', 'AWS CLI', 'jq', 'Python', 'CloudWatch'],
    results: ['80% time saved', '20% cost reduction', 'Automated compliance checks']
  }
];

let currentIndex = 0;
let currentFilter = 'all';
const itemsPerPage = 6;

function getFilteredProjects() {
  return currentFilter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === currentFilter);
}

function renderProjects() {
  const container = document.getElementById('projectsList');
  const filteredProjects = getFilteredProjects();
  
  // Smooth fade out
  container.style.transition = 'opacity 0.3s ease';
  container.style.opacity = '0';
  
  setTimeout(() => {
    container.innerHTML = '';
    const start = currentIndex;
    const end = Math.min(start + itemsPerPage, filteredProjects.length);
    
    for (let i = start; i < end; i++) {
      const project = filteredProjects[i];
      const item = document.createElement('div');
      item.className = 'project-list-item';
      item.style.opacity = '0';
      item.innerHTML = `
        <i class="${project.icon}"></i>
        <div class="project-list-content">
          <h3 class="project-list-title">${project.title}</h3>
          <p class="project-list-desc">${project.desc}</p>
        </div>
        <button class="project-list-link project-details-btn" data-index="${i}">Details →</button>
      `;
      
      item.querySelector('.project-details-btn').addEventListener('click', () => openProjectModal(project));
      container.appendChild(item);
    }
    
    // Smooth fade in with stagger
    requestAnimationFrame(() => {
      container.style.opacity = '1';
      
      const newItems = container.querySelectorAll('.project-list-item');
      newItems.forEach((item, i) => {
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease';
          item.style.opacity = '1';
        }, i * 100);
      });
    });
    
    currentIndex = (end >= filteredProjects.length) ? 0 : end;
    const btn = document.getElementById('loadMoreBtn');
    if (filteredProjects.length <= itemsPerPage) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-block';
      btn.textContent = (currentIndex === 0) ? 'Show Previous' : 'Load More Projects';
    }
  }, 300);
}

// Load More Button
document.getElementById('loadMoreBtn').addEventListener('click', renderProjects);

// Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    currentIndex = 0;
    
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    renderProjects();
  });
});

// Project Modal
let lastProjectFocusedElement = null;

function trapModalFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}

function openProjectModal(project) {
  lastProjectFocusedElement = document.activeElement;
  
  const modal = document.getElementById('projectModal');
  const iconElement = document.getElementById('projectModalIcon');
  
  // Preserve icon classes properly
  iconElement.className = `cert-modal-icon ${project.icon}`;
  
  document.getElementById('projectModalTitle').textContent = project.title;
  document.getElementById('projectModalProblem').textContent = project.problem;
  document.getElementById('projectModalSolution').textContent = project.solution;
  
  const techStack = document.getElementById('projectModalTech');
  techStack.innerHTML = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
  
  const results = document.getElementById('projectModalResults');
  results.innerHTML = project.results.map(result => `<li><i class="fas fa-check-circle"></i> ${result}</li>`).join('');
  
  document.getElementById('projectModalLink').href = project.link;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  
  // Trap focus
  trapModalFocus(modal);
  
  // Focus close button
  setTimeout(() => {
    const closeBtn = modal.querySelector('.project-modal-close');
    if (closeBtn) closeBtn.focus();
  }, 100);
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  
  // Return focus
  if (lastProjectFocusedElement) {
    lastProjectFocusedElement.focus();
    lastProjectFocusedElement = null;
  }
}

// Event listeners for modal
const projectModal = document.getElementById('projectModal');
if (projectModal) {
  projectModal.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
      closeProjectModal();
    }
  });
  
  const closeBtn = projectModal.querySelector('.project-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }
}

window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// Initial render
renderProjects();
