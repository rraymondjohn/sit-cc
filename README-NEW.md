# AWS VPC Migration Strategy for Healthcare Platform

## Current State Analysis

- ✅ S3 bucket deployed (VPC-independent)
- ✅ EC2 instance deployed (in default VPC)
- ❌ RDS not yet deployed

## ⚠️ AWS Learner Labs Limitations

### Key Constraints

- **Session Time Limit**: 4-hour active sessions
- **Budget Constraints**: Limited AWS credits (~$100)
- **Service Restrictions**: Some advanced networking features may be limited
- **Region Restrictions**: Usually locked to us-east-1
- **IAM Limitations**: Restricted permissions for some VPC operations
- **Resource Limits**: Limited number of resources per account

### Impact on VPC Strategy

- **NAT Gateway Cost**: ~$32/month - **significant portion of budget**
- **Data Transfer Costs**: Cross-AZ traffic charges apply
- **Session Timeouts**: Must complete migration within session windows
- **Limited Rollback**: Resource deletion may be permanent due to budget
- **Cost Optimization Required**: Use cost-effective alternatives where possible

## Recommended Migration Approach (Learner Labs Optimized)

### Option 1: Budget-Friendly Custom VPC (Recommended for Learner Labs)

**Benefits:**

- Better security with network isolation
- Cost-optimized for limited budgets
- Follows security best practices within constraints
- Production-like architecture at educational budget

**Cost-Saving Modifications:**

- **Single AZ Deployment**: Reduces cross-AZ data transfer costs
- **NAT Instance instead of NAT Gateway**: Saves ~$28.5/month
- **Minimal Subnets**: One public, one private subnet only
- **t3.nano instances**: Use smallest viable instance types
- **Reduced RDS features**: Single AZ, minimal backups

**Architecture Overview:**

```
VPC CIDR: 10.0.0.0/16
├── Public Subnet: 10.0.1.0/24 (us-east-1a)
│   ├── Application Server (EC2 t2.micro)
│   └── NAT Instance (t3.nano)
└── Private Subnet: 10.0.2.0/24 (us-east-1a)
    └── Database (RDS db.t3.micro)
```

### Option 2: Hybrid Approach (Zero Additional Cost)

**Keep existing setup + enhance security where possible**

- EC2 remains in default VPC
- RDS in default VPC with restricted security groups
- Focus on security group rules rather than network isolation
- **Best for strict budget constraints**

### Option 3: Stay in Default VPC (Most Cost-Effective)

**When budget is extremely tight:**

- All resources in default VPC
- Focus entirely on security group configuration
- Use NACLs for additional security
- Document security trade-offs

## Migration Timeline (Learner Labs Optimized)

### ⏱️ Session Planning

- **Total Time Required**: 2-3 hours
- **Recommendation**: Complete in single 4-hour session
- **Preparation**: Have all configurations documented beforehand

### Phase 1: Infrastructure Setup (45-60 minutes)

- Create simplified custom VPC (single AZ)
- Set up Internet Gateway
- Launch NAT Instance (t3.nano) instead of NAT Gateway
- Configure route tables and security groups

### Phase 2: Database Deployment (30-45 minutes)

- Create RDS subnet group (single AZ)
- Deploy RDS db.t3.micro in private subnet
- Configure database security (no Multi-AZ, minimal backups)

### Phase 3: Application Migration (20-30 minutes)

- Create EC2 AMI snapshot
- Launch new EC2 in custom VPC
- Update application configuration
- Test connectivity

### Phase 4: Cleanup (10-15 minutes)

- Terminate old EC2
- Clean up unused resources
- Verify billing impact

## Security Benefits vs. Cost Trade-offs

### Custom VPC Security Benefits

- Database isolation in private subnet
- Network-level access control
- Better compliance posture
- Scalable architecture foundation

### Learner Labs Cost Considerations

```
Cost Comparison (Monthly):
NAT Gateway: ~$32/month ❌ (Major budget impact)
NAT Instance (t3.nano): ~$3.5/month ✅ (Budget-friendly)
Cross-AZ Data Transfer: $0.01/GB ⚠️ (Monitor usage)
Single AZ Strategy: $0 additional ✅ (Recommended)
```

### Security Group Configuration (All Options)

```
Database Security Group:
- Inbound: MySQL (3306) from Application SG only
- Outbound: None required

Application Security Group:
- Inbound: SSH (22) from your IP only
- Inbound: HTTP (80) from anywhere
- Inbound: Custom TCP (3001) from anywhere
- Outbound: All traffic

Budget-Conscious Alternative:
- Use Default VPC with restrictive security groups
- Implement application-level security
- Use AWS WAF free tier if available
```

## Minimal Downtime Strategy

### Pre-Migration Preparation

1. Document current EC2 configuration
2. Export application data/configurations
3. Prepare deployment scripts
4. Set up monitoring

### Migration Execution

1. Create custom VPC infrastructure
2. Deploy RDS in private subnets
3. Create new EC2 with same configuration
4. Update DNS records to point to new EC2
5. Verify functionality
6. Decommission old EC2

### Rollback Plan

- Keep old EC2 stopped (not terminated) for 24-48 hours
- Document all IP addresses and configurations
- Have database backup ready

## Cost Considerations for Learner Labs

### Budget Impact Analysis

```
Resource Cost Breakdown (Monthly):
✅ EC2 t2.micro: ~$8.5 (usually covered by free tier)
✅ RDS db.t3.micro: ~$12.5 (single AZ)
❌ NAT Gateway: ~$32 (avoid - use NAT instance)
✅ NAT Instance t3.nano: ~$3.5 (budget-friendly alternative)
✅ VPC, Subnets, IGW: $0 (free)
⚠️ Data Transfer: $0.01/GB (monitor usage)

Total with NAT Gateway: ~$53/month
Total with NAT Instance: ~$24.5/month
Total Default VPC: ~$21/month
```

### Cost Optimization Strategies

1. **Use NAT Instance instead of NAT Gateway** (saves ~$28.5/month)
2. **Single AZ deployment** (saves cross-AZ transfer costs)
3. **Minimal RDS configuration** (no Multi-AZ, reduced backup retention)
4. **Monitor session usage** (avoid resource waste during inactive periods)
5. **Clean up resources** when not needed

### Budget-Conscious Migration Decision Tree

```
Available Budget > $50/month?
├── Yes → Proceed with Custom VPC + NAT Gateway
└── No → Available Budget > $25/month?
    ├── Yes → Custom VPC + NAT Instance
    └── No → Stay in Default VPC, focus on Security Groups
```

## Timeline Recommendation for Learner Labs

### ⚠️ Critical Learner Labs Considerations

**Session Management:**

- Lab sessions automatically terminate after 4 hours
- All work must be completed within session window
- Budget resets but resources may be lost between sessions

**Best Migration Window:**

- Start migration at beginning of fresh lab session
- Have all configurations and scripts prepared beforehand
- Complete testing within same session

**Risk Mitigation:**

- Document all resource IDs and configurations
- Take screenshots of working configurations
- Export application data before migration

### Recommended Approach Based on Budget

**Option A: Limited Budget (<$30 remaining)**

```
Recommendation: Stay in Default VPC
- Focus on security group hardening
- Deploy RDS with restrictive access
- Document security considerations
- Plan future migration when budget allows
```

**Option B: Moderate Budget ($30-50 remaining)**

```
Recommendation: Custom VPC with NAT Instance
- Deploy simplified custom VPC
- Use t3.nano NAT instance
- Single AZ deployment
- Monitor costs closely
```

**Option C: Sufficient Budget (>$50 remaining)**

```
Recommendation: Full Custom VPC with NAT Gateway
- Deploy multi-AZ custom VPC
- Use managed NAT Gateway
- Implement all security best practices
- Plan for production-ready architecture
```

### Migration Success Factors

1. **Pre-Planning**: Have all configurations ready
2. **Session Timing**: Start with fresh 4-hour window
3. **Budget Monitoring**: Track costs in real-time
4. **Quick Rollback**: Keep old resources until verification
5. **Documentation**: Record everything for future sessions

---

## 🔧 Detailed Implementation: Option 1 - Budget-Friendly Custom VPC

### Prerequisites & Learner Labs Preparation

**Before Starting:**

- ✅ Fresh 4-hour Learner Labs session
- ✅ Budget check (need ~$25-30 remaining for monthly costs)
- ✅ Current EC2 instance details documented
- ✅ Application code and data backed up
- ✅ RDS endpoint information ready (if migrating existing)

**Session Timeline:**

- **Total Time Required**: 2-3 hours
- **Buffer Time**: Plan for 45 minutes of troubleshooting/testing
- **Recommended Start**: Beginning of fresh 4-hour lab session

### Phase 1: Create Custom VPC Infrastructure (45-60 minutes)

#### Step 1.1: Create the VPC

1. **Navigate to VPC Console**

   ```
   AWS Console → Services → VPC → Your VPCs
   ```

2. **Create VPC**

   - Click "Create VPC"
   - **Resources to create**: VPC only (simpler approach)
   - **Name tag**: `healthcare-vpc-learner`
   - **IPv4 CIDR block**: `10.0.0.0/16`
   - **IPv6 CIDR block**: No IPv6 CIDR block
   - **Tenancy**: Default
   - **Tags**: Add any additional tags for organization
   - Click "Create VPC"

   **💡 Learner Labs Tip**: Note down the VPC ID for reference

#### Step 1.2: Create Internet Gateway

1. **Create and Attach Internet Gateway**

   ```
   VPC Console → Internet Gateways → Create internet gateway
   - Name tag: healthcare-igw
   - Click "Create internet gateway"
   ```

2. **Attach to VPC**
   - Select the created IGW
   - Actions → Attach to VPC
   - Select `healthcare-vpc-learner`
   - Click "Attach internet gateway"

#### Step 1.3: Create Subnets (Single AZ for Cost Savings)

1. **Create Public Subnet**

   ```
   VPC Console → Subnets → Create subnet
   - VPC ID: healthcare-vpc-learner
   - Subnet name: healthcare-public-subnet
   - Availability Zone: us-east-1a
   - IPv4 CIDR block: 10.0.1.0/24
   - Tags: Add Environment=Production, Tier=Public
   ```

2. **Create Private Subnet**

   ```
   Create subnet (repeat process)
   - VPC ID: healthcare-vpc-learner
   - Subnet name: healthcare-private-subnet
   - Availability Zone: us-east-1a (same AZ to save cross-AZ costs)
   - IPv4 CIDR block: 10.0.2.0/24
   - Tags: Add Environment=Production, Tier=Private
   ```

3. **Enable Auto-assign Public IP for Public Subnet**
   - Select `healthcare-public-subnet`
   - Actions → Edit subnet settings
   - ✅ Enable "Auto-assign public IPv4 address"
   - Save

#### Step 1.4: Create NAT Gateway (Managed Solution)

**Why NAT Gateway for Short-Term Projects:**

- NAT Gateway: ~$32/month (but only ~$7-8 for a week)
- NAT Instance (t3.nano): ~$3.5/month + management overhead
- **For 1-week school project**: NAT Gateway is more reliable and easier to manage
- **Savings on time**: No need to configure and troubleshoot NAT instance

1. **Create NAT Gateway**

   ```
   VPC Console → NAT Gateways → Create NAT gateway
   - Name: healthcare-nat-gateway
   - Subnet: healthcare-public-subnet (must be in public subnet)
   - Connectivity type: Public
   - Elastic IP allocation: Allocate Elastic IP (click to create new)
   ```

2. **Wait for NAT Gateway Creation**
   - Status will show "Pending" initially
   - Wait for status to change to "Available" (takes 2-3 minutes)
   - Note down the NAT Gateway ID for route table configuration

**💡 Cost Note for School Project:**

- Weekly cost: ~$7-8 (much more reasonable for short-term use)
- No instance management required
- Higher reliability and AWS-managed service
- Better performance than t3.nano NAT instance

#### Step 1.5: Create and Configure Route Tables

1. **Create Public Route Table**

   ```
   VPC Console → Route Tables → Create route table
   - Name: healthcare-public-rt
   - VPC: healthcare-vpc-learner
   - Description: Routes for public subnet
   ```

2. **Configure Public Route Table**

   ```
   Select healthcare-public-rt:
   - Routes tab → Edit routes → Add route
     * Destination: 0.0.0.0/0
     * Target: Internet Gateway → healthcare-igw
   - Subnet associations → Edit subnet associations
     * ✅ Associate healthcare-public-subnet
   ```

3. **Create Private Route Table**

   ```
   Create route table:
   - Name: healthcare-private-rt
   - VPC: healthcare-vpc-learner
   - Description: Routes for private subnet via NAT
   ```

4. **Configure Private Route Table**
   ```
   Select healthcare-private-rt:
   - Routes tab → Edit routes → Add route
     * Destination: 0.0.0.0/0
     * Target: NAT Gateway → Select healthcare-nat-gateway
   - Subnet associations → Edit subnet associations
     * ✅ Associate healthcare-private-subnet
   ```

### Phase 2: Create Security Groups (15-20 minutes)

#### Step 2.1: Database Security Group

```
EC2 Console → Security Groups → Create security group
- Name: healthcare-db-sg
- Description: Database access from application servers only
- VPC: healthcare-vpc-learner

Inbound rules:
- Type: MySQL/Aurora (3306)
- Protocol: TCP
- Port range: 3306
- Source: Custom → (will reference app security group next)
- Description: MySQL access from application tier

Outbound rules: Default (all traffic) is fine for database
```

#### Step 2.2: Application Security Group

```
Create security group:
- Name: healthcare-app-sg
- Description: Web application servers
- VPC: healthcare-vpc-learner

Inbound rules:
- SSH (22): Source: My IP (your current IP for management)
- HTTP (80): Source: Anywhere IPv4 (0.0.0.0/0) for web access
- HTTPS (443): Source: Anywhere IPv4 (0.0.0.0/0) for secure web access
- Custom TCP (3001): Source: Anywhere IPv4 (0.0.0.0/0) for API access

Outbound rules: All traffic (default) - applications need internet access
```

#### Step 2.3: Update Database Security Group Reference

```
Go back to healthcare-db-sg:
- Edit inbound rules
- Update MySQL/Aurora rule:
  * Source: Custom → healthcare-app-sg
  * This creates a reference allowing only app servers to access database
```

### Phase 3: Deploy RDS in Private Subnet (30-45 minutes)

#### Step 3.1: Create DB Subnet Group

```
RDS Console → Subnet groups → Create DB subnet group
- Name: healthcare-db-subnet-group
- Description: Private subnets for healthcare database
- VPC: healthcare-vpc-learner
- Availability Zones: us-east-1a
- Subnets: Select healthcare-private-subnet
```

**⚠️ Important**: RDS requires at least 2 AZs for subnet groups. If you get an error:

```
Create additional private subnet:
- Name: healthcare-private-subnet-2
- AZ: us-east-1b
- CIDR: 10.0.3.0/24
- Add this to your DB subnet group
- Update private route table to include this subnet
```

#### Step 3.2: Create RDS Instance (Learner Labs Optimized)

```
RDS Console → Databases → Create database
- Creation method: Standard create
- Engine options: MySQL 8.0
- Version: Use default latest
- Templates: Dev/Test (more cost-effective than Production)

Settings:
- DB instance identifier: healthcare-db
- Master username: admin
- Master password: [Strong password - save securely!]

Instance configuration:
- DB instance class: db.t3.micro (cheapest option)
- Storage type: General Purpose SSD (gp2)
- Allocated storage: 20 GiB (minimum)
- Enable storage autoscaling: No (cost control)

Connectivity:
- Virtual private cloud (VPC): healthcare-vpc-learner
- DB subnet group: healthcare-db-subnet-group
- Public access: No (CRITICAL for security)
- VPC security groups: Choose existing → healthcare-db-sg
- Availability Zone: us-east-1a
- Database port: 3306

Additional configuration:
- Initial database name: healthcare_app
- Backup retention period: 1 day (minimum for recovery)
- Backup window: Default
- Backup replication: Disable
- Enhanced monitoring: Disable (cost saving)
- Log exports: None (cost saving)
- Auto minor version upgrade: Enable
- Maintenance window: Default
- Deletion protection: Disable (easier cleanup for labs)
```

**💰 Cost Optimization Notes:**

- Single AZ (not Multi-AZ): Saves ~50% on RDS costs
- No enhanced monitoring: Saves ~$3-5/month
- Minimal backup retention: Reduces storage costs
- t3.micro instance: Cheapest available option

### Phase 4: Deploy New EC2 in Custom VPC (15-20 minutes)

#### Step 4.1: Launch EC2 Instance in Custom VPC

```
EC2 Console → Launch Instance
- Name: healthcare-app
- AMI: Amazon Linux 2023 (latest) or Ubuntu Server 22.04 LTS
- Instance type: t2.micro (free tier eligible)
- Key pair: Create new or use existing key pair

Network settings:
- VPC: healthcare-vpc-learner
- Subnet: healthcare-public-subnet
- Auto-assign public IP: Enable
- Security groups: Select existing → healthcare-app-sg

Storage:
- Root volume: 8 GiB (default)
- Volume type: gp3 (default)

Advanced details: Keep defaults (no IAM role needed)
```

#### Step 4.2: Connect and Setup Application Environment

1. **Connect to EC2 Instance**

   ```bash
   # Get public IP from EC2 console
   ssh -i your-key.pem ec2-user@[EC2-PUBLIC-IP]
   # or use EC2 Instance Connect from AWS console
   ```

2. **Install Required Software**

   ```bash
   # Update system packages
   sudo yum update -y

   # Install Node.js and npm (for Node.js applications)
   sudo yum install -y nodejs npm

   # Install MySQL client (to connect to RDS)
   sudo yum install -y mysql

   # Install Git (to clone your repository)
   sudo yum install -y git

   # Install PM2 for process management (optional)
   sudo npm install -g pm2
   ```

3. **Deploy Your Application**

   ```bash
   # Clone your healthcare application repository
   git clone https://github.com/your-username/your-healthcare-repo.git
   cd your-healthcare-repo

   # Install application dependencies
   npm install

   # Create environment configuration file
   nano .env
   ```

4. **Configure Database Connection**

   ```bash
   # In your .env file, add:
   DB_HOST=[RDS-ENDPOINT]
   DB_PORT=3306
   DB_USER=admin
   DB_PASSWORD=[your-rds-password]
   DB_NAME=healthcare_app
   NODE_ENV=production
   PORT=3001

   # Save and exit (Ctrl+X, then Y, then Enter)
   ```

#### Step 4.3: Test Database Connectivity

```bash
# Test connection to RDS from EC2
mysql -h [RDS-ENDPOINT] -u admin -p healthcare_app

# If successful, you should see MySQL prompt
# Create your application tables if needed
# Example:
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Exit MySQL
EXIT;
```

#### Step 4.4: Start and Test Application

```bash
# Start your application
npm start
# or if using PM2:
# pm2 start server.js --name healthcare-app

# Test application locally
curl http://localhost:3001/api/health
# or test specific endpoints

# Check if application is running
ps aux | grep node
```

### Phase 5: Testing & Verification (15-20 minutes)

#### Step 5.1: Network Connectivity Tests

1. **Test Internet Access from Public Subnet**

   ```bash
   # From application server
   curl -I https://google.com
   ping -c 4 8.8.8.8
   ```

2. **Test NAT Instance Functionality**

   ```bash
   # Connect to a private instance (if you have one) or test from app server
   # Verify outbound internet access works through NAT
   curl -I https://aws.amazon.com
   ```

3. **Test Database Access**

   ```bash
   # From application server
   mysql -h [RDS-ENDPOINT] -u admin -p healthcare_app

   # Run some test queries
   SHOW DATABASES;
   USE healthcare_app;
   SHOW TABLES;
   ```

#### Step 5.2: Application Functionality Tests

1. **Frontend Connectivity**

   - Access application via new EC2 public IP
   - Test all major application features
   - Verify API calls are working

2. **Database Operations**

   - Test user login/registration
   - Test data creation/retrieval
   - Verify all CRUD operations work

3. **Performance Check**
   - Monitor response times
   - Check for any connectivity issues
   - Verify no degradation from original setup

### Phase 6: Cleanup & Optimization (10-15 minutes)

#### Step 6.2: Update Application References

```bash
# Update S3 static website CORS settings if needed
# Point your frontend to new EC2 public IP

# If using custom domain, update DNS records
# Point your domain to new EC2 public IP

# Update any configuration files in S3 bucket
# that reference the backend API endpoint
```

#### Step 6.3: Cost Monitoring Setup

```
Billing Console → Cost Explorer
- Create cost budget alerts
- Monitor daily costs
- Set up alerts for >$1/day spending
```

### Troubleshooting Common Issues

#### NAT Gateway Problems

```bash
# Check NAT Gateway status
1. Verify NAT Gateway is in "Available" state
2. Check route table points to correct NAT Gateway
3. Verify NAT Gateway is in public subnet with IGW route
4. Check Elastic IP is properly allocated
5. Test outbound connectivity from private subnet
```

#### RDS Connection Issues

```bash
# Debug RDS connectivity
1. Verify RDS is in "Available" state
2. Check security group allows 3306 from app security group
3. Verify subnet group configuration
4. Test from EC2: telnet [RDS-ENDPOINT] 3306
5. Check RDS endpoint in application configuration
```

#### Application Access Problems

```bash
# Debug application access
1. Check EC2 security group allows ports 80, 443, 3001
2. Verify application is running: ps aux | grep node
3. Check application logs: tail -f /var/log/your-app.log
4. Test local access: curl localhost:3001
5. Verify public IP and security group configuration
```

### Final Verification Checklist ✅

- [ ] VPC created with correct CIDR (10.0.0.0/16)
- [ ] Public subnet allows internet access via IGW
- [ ] Private subnet routes through NAT Gateway
- [ ] NAT Gateway is available and functioning
- [ ] RDS in private subnet with no public access
- [ ] Security groups properly restrict access
- [ ] EC2 instance deployed in public subnet
- [ ] Application connects to RDS endpoint
- [ ] All application features working
- [ ] Performance is acceptable
- [ ] Cost monitoring enabled

### Cost Summary (Monthly Estimates)

```
💰 Resource Costs (1 Week Project):
✅ EC2 t2.micro: ~$2.00 (1 week)
✅ RDS db.t3.micro: ~$3.00 (1 week, single AZ)
✅ NAT Gateway: ~$7.50 (1 week)
✅ VPC, Subnets, IGW: $0.00 (free)
✅ Data Transfer: ~$0.25 (estimated for 1 week)

Total for 1 Week: ~$12.75
Monthly equivalent: ~$53 (but only running for 1 week)

🎯 Perfect for school projects: Reliable, managed, easy setup!
```

### Learning Outcomes

**What You've Achieved:**

- ✅ Network segmentation (public/private subnets)
- ✅ Database isolation from internet
- ✅ Managed NAT Gateway solution (reliable)
- ✅ Production-ready security architecture
- ✅ Scalable infrastructure foundation

**Skills Developed:**

- VPC design and implementation
- Security group configuration
- AWS managed services usage
- Network troubleshooting
- Infrastructure migration planning

This implementation provides enterprise-level network security with AWS managed services - perfect for school projects requiring reliability and professional architecture!

### Phase 1: Create Custom VPC Infrastructure (45-60 minutes)

#### Step 1.1: Create the VPC

1. **Navigate to VPC Console**

   ```
   AWS Console → Services → VPC
   ```

2. **Create VPC**
   - Click "Create VPC"
   - **Resources to create**: VPC only (not "VPC and more" - avoid complications)
   - **Name tag**: `healthcare-vpc-learner`
   - **IPv4 CIDR block**: `10.0.0.0/16`
   - **IPv6 CIDR block**: No IPv6 CIDR block
   - **Tenancy**: Default
   - Click "Create VPC"

#### Step 1.2: Create Internet Gateway

1. **In VPC Console → Internet Gateways**

   - Click "Create internet gateway"
   - **Name tag**: `healthcare-igw`
   - Click "Create internet gateway"

2. **Attach to VPC**
   - Select the created IGW
   - Actions → Attach to VPC
   - Select `healthcare-vpc-learner`
   - Click "Attach internet gateway"

#### Step 1.3: Create Subnets

1. **Create Public Subnet**

   ```
   VPC Console → Subnets → Create subnet
   - VPC ID: healthcare-vpc-learner
   - Subnet name: healthcare-public-subnet
   - Availability Zone: us-east-1a
   - IPv4 CIDR block: 10.0.1.0/24
   ```

2. **Create Private Subnet**

   ```
   Create subnet (repeat process)
   - VPC ID: healthcare-vpc-learner
   - Subnet name: healthcare-private-subnet
   - Availability Zone: us-east-1a (same AZ to save costs)
   - IPv4 CIDR block: 10.0.2.0/24
   ```

3. **Enable Auto-assign Public IP for Public Subnet**
   - Select `healthcare-public-subnet`
   - Actions → Edit subnet settings
   - ✅ Enable "Auto-assign public IPv4 address"
   - Save

#### Step 1.4: Create NAT Instance (Budget-Friendly Alternative)

1. **Launch NAT Instance in Public Subnet**

   ```
   EC2 Console → Launch Instance
   - Name: healthcare-nat-instance
   - AMI: Search "NAT" → Select "amzn-ami-vpc-nat" (Community AMI)
   - Instance type: t3.nano (cheapest option)
   - Key pair: Use existing or create new
   - Network settings:
     * VPC: healthcare-vpc-learner
     * Subnet: healthcare-public-subnet
     * Auto-assign public IP: Enable
   ```

2. **Configure NAT Instance Security Group**

   ```
   Create security group: healthcare-nat-sg
   Inbound rules:
   - HTTP (80): Source 10.0.2.0/24 (private subnet)
   - HTTPS (443): Source 10.0.2.0/24 (private subnet)
   - SSH (22): Source Your IP (for management)

   Outbound rules:
   - All traffic: 0.0.0.0/0
   ```

3. **Disable Source/Destination Check**
   - Select NAT instance → Actions → Networking → Change source/destination check
   - ✅ Stop (disable source/destination check)

#### Step 1.5: Create Route Tables

1. **Create Public Route Table**

   ```
   VPC Console → Route Tables → Create route table
   - Name: healthcare-public-rt
   - VPC: healthcare-vpc-learner
   ```

2. **Configure Public Route Table**

   - Select `healthcare-public-rt`
   - Routes tab → Edit routes
   - Add route: `0.0.0.0/0` → Target: Internet Gateway (`healthcare-igw`)
   - Subnet associations → Edit subnet associations
   - ✅ Associate `healthcare-public-subnet`

3. **Create Private Route Table**

   ```
   Create route table
   - Name: healthcare-private-rt
   - VPC: healthcare-vpc-learner
   ```

4. **Configure Private Route Table**
   - Select `healthcare-private-rt`
   - Routes tab → Edit routes
   - Add route: `0.0.0.0/0` → Target: Instance (select NAT instance)
   - Subnet associations → Edit subnet associations
   - ✅ Associate `healthcare-private-subnet`

### Phase 2: Create Security Groups (15-20 minutes)

#### Step 2.1: Database Security Group

```
EC2 Console → Security Groups → Create security group
- Name: healthcare-db-sg
- Description: Database access from application only
- VPC: healthcare-vpc-learner

Inbound rules:
- Type: MySQL/Aurora (3306)
- Source: Custom → healthcare-app-sg (will create next)
- Description: MySQL from application servers

Outbound rules: None needed (default is fine)
```

#### Step 2.2: Application Security Group

```
Create security group
- Name: healthcare-app-sg
- Description: Web application servers
- VPC: healthcare-vpc-learner

Inbound rules:
- SSH (22): Source: My IP (your current IP)
- HTTP (80): Source: Anywhere IPv4 (0.0.0.0/0)
- Custom TCP (3001): Source: Anywhere IPv4 (0.0.0.0/0)

Outbound rules: All traffic (default)
```

**⚠️ Update Database Security Group:**

- Go back to `healthcare-db-sg`
- Edit inbound rules → Select `healthcare-app-sg` as source for MySQL rule

### Phase 3: Deploy RDS in Private Subnet (30-45 minutes)

#### Step 3.1: Create DB Subnet Group

```
RDS Console → Subnet groups → Create DB subnet group
- Name: healthcare-db-subnet-group
- Description: Private subnet for healthcare database
- VPC: healthcare-vpc-learner
- Availability Zones: us-east-1a (single AZ for cost savings)
- Subnets: Select healthcare-private-subnet
```

**⚠️ Learner Labs Note:** If you need at least 2 AZs, create a second private subnet in us-east-1b:

```
Additional subnet (if required):
- Name: healthcare-private-subnet-2
- AZ: us-east-1b
- CIDR: 10.0.3.0/24
```

#### Step 3.2: Create RDS Instance

```
RDS Console → Databases → Create database
- Database creation method: Standard create
- Engine options: MySQL (or your preferred engine)
- Version: Latest stable version
- Templates: Free tier (if available) or Dev/Test

Instance configuration:
- DB instance class: db.t3.micro
- Storage: 20 GiB (minimum)
- Storage type: General Purpose SSD (gp2)

Settings:
- DB instance identifier: healthcare-db
- Master username: admin
- Master password: [Create strong password - save it!]

Connectivity:
- VPC: healthcare-vpc-learner
- DB subnet group: healthcare-db-subnet-group
- Public access: No
- VPC security groups: healthcare-db-sg
- Availability Zone: us-east-1a

Additional configuration:
- Initial database name: healthcare_db
- Backup retention period: 0 days (cost saving)
- Monitoring: Disable enhanced monitoring (cost saving)
- Deletion protection: Disable (for easier cleanup)
```

### Phase 4: Migrate EC2 to New VPC (20-30 minutes)

#### Step 4.1: Create AMI of Current EC2

```
EC2 Console → Instances
- Select your current EC2 instance
- Actions → Image and templates → Create image
- Image name: healthcare-app-backup-[date]
- Image description: Backup before VPC migration
- No reboot: Leave unchecked (safer)
- Click "Create image"
```

**⏱️ Wait 5-10 minutes for AMI creation to complete**

#### Step 4.2: Launch New EC2 in Custom VPC

```
EC2 Console → Launch Instance
- Name: healthcare-app-new
- AMI: My AMIs → Select your created AMI
- Instance type: t2.micro (same as current)
- Key pair: Use same key pair

Network settings:
- VPC: healthcare-vpc-learner
- Subnet: healthcare-public-subnet
- Auto-assign public IP: Enable
- Security groups: Select existing → healthcare-app-sg
```

#### Step 4.3: Update Application Configuration

1. **Connect to new EC2 instance**

   ```bash
   # Use EC2 Instance Connect or SSH
   ssh -i your-key.pem ec2-user@[NEW-PUBLIC-IP]
   ```

2. **Update database connection in your application**

   ```bash
   # Navigate to your application directory
   cd /path/to/your/app

   # Update database configuration file
   # Replace old DB endpoint with new RDS endpoint
   # Use private IP of RDS instance
   ```

3. **Test application connectivity**

   ```bash
   # Test database connection
   mysql -h [RDS-ENDPOINT] -u admin -p healthcare_db

   # Start your application and test
   npm start  # or your application start command
   ```

### Phase 5: Testing & Verification (10-15 minutes)

#### Step 5.1: Connectivity Tests

1. **Test Internet Access from Public Subnet**

   ```bash
   # From application server
   curl -I http://google.com
   ```

2. **Test Database Access from Application**

   ```bash
   # Test MySQL connection from app server
   mysql -h [RDS-ENDPOINT] -u admin -p
   ```

3. **Test Application Functionality**
   - Access your application via new public IP
   - Test all major features
   - Verify data integrity

#### Step 5.2: Performance Verification

- Check application response times
- Verify all API endpoints work
- Test frontend-backend connectivity

### Phase 6: Cleanup & Cost Optimization (10-15 minutes)

#### Step 6.1: Terminate Old Resources

```
⚠️ Only after confirming new setup works completely!

1. Stop old EC2 instance (don't terminate immediately)
2. Wait 24 hours, then terminate if everything works
3. Clean up old security groups if unused
4. Remove old snapshots if not needed
```

#### Step 6.2: Cost Monitoring Setup

```
Billing Console → Cost Explorer
- Set up cost alerts
- Monitor NAT instance usage
- Track data transfer costs
```

### Troubleshooting Common Issues

#### NAT Instance Not Working

```bash
# Check NAT instance
1. Verify source/destination check is disabled
2. Check security group allows traffic from private subnet
3. Verify route table points to NAT instance correctly
```

#### RDS Connection Issues

```bash
# Common fixes
1. Check security group allows 3306 from app security group
2. Verify subnet group is correctly configured
3. Test using RDS endpoint, not IP address
```

#### Application Not Accessible

```bash
# Debug steps
1. Check security group allows port 80/3001
2. Verify route table associations
3. Check if application service is running
```

### Budget Monitoring Commands

```bash
# Check current costs
aws ce get-cost-and-usage --help  # If AWS CLI available

# Monitor resource usage
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]'
```

### Final Checklist ✅

- [ ] VPC created with correct CIDR
- [ ] Subnets created in single AZ
- [ ] NAT Gateway created and available
- [ ] Security groups properly configured
- [ ] RDS deployed in private subnet
- [ ] New EC2 instance working
- [ ] Application connectivity verified
- [ ] Old resources documented for cleanup
- [ ] Cost monitoring enabled

**Estimated Total Cost: ~$24.5/month**

- EC2 t2.micro: ~$8.5
- RDS db.t3.micro: ~$12.5
- NAT Instance t3.nano: ~$3.5
- Data transfer: minimal

This approach gives you a production-like architecture while staying within Learner Labs budget constraints!
